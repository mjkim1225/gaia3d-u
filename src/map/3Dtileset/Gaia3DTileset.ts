import * as Cesium from 'cesium';
import config from "../config";

export default class Gaia3DTileset {
    private readonly viewer: Cesium.Viewer | null;
    private tilesetObj: Cesium.Cesium3DTileset | null = null;
    private color: { conditions: string[][] };
    private show: { conditions: string[][] };

    constructor(viewer: Cesium.Viewer | null, url: string) {
        this.viewer = viewer;
        this.color = {
            conditions: [["true", "color('lightgrey')"]],
        };
        this.show = {
            conditions: [],
        };

        Cesium.Cesium3DTileset.fromUrl(
            url
        ).then((tileset) => {
            tileset.customShader = new Cesium.CustomShader({
                lightingModel: Cesium.LightingModel.UNLIT
            })

            tileset.style = this.getStyle();
            this.viewer?.scene.primitives.add(tileset);
            this.tilesetObj = tileset;
        })
    }

    toggle() {
        if(this.tilesetObj) {
            this.tilesetObj.show = !this.tilesetObj.show;
        }
    }

    remove() {
        if(this.tilesetObj) {
            this.viewer?.scene.primitives.remove(this.tilesetObj);
        }
    }

    setTransparency (transparency: number) {
        if(this.tilesetObj) {
            this.setStyleColor(`color('lightgrey', ${transparency})`);
            this.tilesetObj.style = this.getStyle();
        }
    }

    setShadowMode (mode: keyof typeof config.SHADOW_MODE) {
        if(this.tilesetObj) {
            this.tilesetObj.shadows = config.SHADOW_MODE[mode];
        }
    }

    setStyleColor(color: string) {
        if(this.tilesetObj) {
            this.color = {
                conditions: [["true", color]],
            };
            this.tilesetObj.style = this.getStyle();
        }
    }

    addStyleShow(field: string, condition: string) {
        if(this.tilesetObj) {
            const conditions = this.show.conditions;
            let pushed = false;
            for (let i = 0; i < conditions.length; i++) {
                if (conditions[i][1].indexOf(field) > -1) {
                    conditions[i] = ['true', condition];
                    pushed = true;
                    break;
                }
            }
            if (!pushed) this.show.conditions.push(['true', condition]);

            this.tilesetObj.style = this.getStyle();
        }
    }

    getStyle() {
        const showCondition = this.show.conditions;
        let show = {
            conditions: [["false", "false"]],
        };

        if (showCondition.length > 0) {
            const wholeConditions = showCondition
                .map(([, condition]) => condition)
                .join(' && ');
            show = {
                conditions: [["true", wholeConditions]],
            };
        }

        return new Cesium.Cesium3DTileStyle({
            color: this.color,
            show: show,
        });
    }

    createClippingPlanes() {
        if (this.tilesetObj) {

            const {BOX_SIZE, DIRECTIONS, naming} = config.CLIPPING_OPTIONS;
            const planeEntities = [];
            const clippingPlanes = new Cesium.ClippingPlaneCollection();
            const faces = [
                {
                    direction: DIRECTIONS.RIGHT,
                    value: new Cesium.Cartesian3(1.0, 0.0, 0.0),
                },
                {
                    direction: DIRECTIONS.LEFT,
                    value: new Cesium.Cartesian3(-1.0, 0.0, 0.0),

                },
                {
                    direction: DIRECTIONS.FRONT,
                    value: new Cesium.Cartesian3(0.0, 1.0, 0.0),
                },
                {
                    direction: DIRECTIONS.BACK,
                    value: new Cesium.Cartesian3(0.0, -1.0, 0.0),
                },
                {
                    direction: DIRECTIONS.TOP,
                    value: new Cesium.Cartesian3(0.0, 0.0, 1.0),
                },
                {
                    direction: DIRECTIONS.BOTTOM,
                    value: new Cesium.Cartesian3(0.0, 0.0, -1.0),
                }
            ]

            for (let i = 0; i < faces.length; i++) {
                const cartesian = faces[i].value;
                const plane = new Cesium.ClippingPlane( cartesian, (-1) * BOX_SIZE / 2 );
                clippingPlanes.add(plane);
            }

            this.tilesetObj.clippingPlanes = clippingPlanes;

            const viewer = this.viewer;
            const camera = viewer?.camera;
            const scene = viewer?.scene;

            // 카메라가 보는 지점의 스크린 좌표를 가져옴
            const cameraPosition = camera.position;
            const cameraDirection = camera.direction;
            const ray = new Cesium.Ray(cameraPosition, cameraDirection);
            const position = scene?.globe.pick(ray, scene);

            // const boundingSphere = this.tilesetObj.boundingSphere;
            // const position = boundingSphere.center;

            let targetY = (-1) * BOX_SIZE / 2;

            const createPlaneUpdateFunction
                = (plane) => () => {
                plane.distance = targetY; // 카메라에서의 거리로 설정
                return plane;
            }

            const size = BOX_SIZE;
            for (let j = 0; j < faces.length; j++) {
                const direction = faces[j].direction;
                const planeEntity = viewer?.entities.add({
                    id: naming('tmp', direction),
                    position: position, // 카메라가 보는 지점으로 설정
                    plane: {
                        dimensions: new Cesium.Cartesian2(size, size),
                        material: Cesium.Color.WHITE.withAlpha(0.1),
                        plane: new Cesium.CallbackProperty(
                            createPlaneUpdateFunction(clippingPlanes.get(j)),
                            false
                        ),
                        outline: true,
                        outlineColor: Cesium.Color.WHITE,
                    },
                });
                planeEntities.push(planeEntity);
            }

            this.tilesetObj.clippingPlanes.enabled = true;

            this.tilesetObj.clippingPlanes.edgeColor = Cesium.Color.WHITE;

            /**
             * HANDLER
             */
            let selectedPlane = undefined;
            let selectedEntity = undefined;
            const handlerControl = new Cesium.ScreenSpaceEventHandler(scene?.canvas);
            handlerControl.setInputAction(function (movement) {
                const pickedObject = scene?.pick(movement.position);
                // console.log(pickedObject)
                if (
                    Cesium.defined(pickedObject) &&
                    Cesium.defined(pickedObject.id) &&
                    Cesium.defined(pickedObject.id.plane)
                ) {
                    selectedEntity = pickedObject.id;
                    // @ts-ignore
                    selectedPlane = selectedEntity.plane;
                    // @ts-ignore
                    selectedPlane.material = Cesium.Color.RED.withAlpha(0.05); selectedPlane.outlineColor = Cesium.Color.RED;
                    // @ts-ignore
                    scene.screenSpaceCameraController.enableInputs = false;
                }
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

            handlerControl.setInputAction(function () {
                if (Cesium.defined(selectedPlane)) {
                    // @ts-ignore
                    selectedPlane.material = Cesium.Color.WHITE.withAlpha(0.1); selectedPlane.outlineColor = Cesium.Color.WHITE;

                    // @ts-ignore
                    selectedEntity = undefined; selectedPlane = undefined;
                }
                // @ts-ignore
                scene.screenSpaceCameraController.enableInputs = true;
            }, Cesium.ScreenSpaceEventType.LEFT_UP);

            handlerControl.setInputAction(function (movement) {
                if (Cesium.defined(selectedEntity) && Cesium.defined(selectedPlane)) {
                    // Get Cartesian3 of intersection
                    const deltaY = (movement.startPosition.y - movement.endPosition.y) ;
                    targetY += -1 * deltaY;
                    // const pickedPosition = scene?.pickPosition(movement.endPosition);
                    //
                    // for (const entity of planeEntities) {
                    //     // @ts-ignore
                    //     entity.position = pickedPosition;
                    // }
                }
            }.bind(this), Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        }
    }

}
