import * as Cesium from 'cesium';

import {CameraOption} from "./types";
import config from './config';

import {getTodayWithTime, plus9hours} from "../utils/datetime";

type Viewer = Cesium.Viewer;

let viewer: Viewer | null = null;

const setCameraView = (params: CameraOption) => {
    viewer?.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
            params.longitude,
            params.latitude,
            params.altitude
        ),
        orientation: {
            heading: Cesium.Math.toRadians(params.heading),
            pitch: Cesium.Math.toRadians(params.pitch),
            roll: params.roll
        },
    });
};

const setKorDateTime = (timeStr: string | void) => {
    // ex time "08:10:05"
    const today = timeStr? getTodayWithTime(timeStr) : new Date();
    plus9hours(today);
    if(viewer) viewer.clock.currentTime = Cesium.JulianDate.fromDate(today);
}

const add3DTilesetAndGetIndex = async (url: string): Promise< number | undefined> => {
    if(viewer) {
        const index = viewer.scene.primitives.length;
        try {
            const tileset = await Cesium.Cesium3DTileset.fromUrl(
                url
            );
            tileset.customShader = new Cesium.CustomShader({
                lightingModel: Cesium.LightingModel.UNLIT
            })

            tileset.style = new Cesium.Cesium3DTileStyle({
                color: {
                    conditions: [
                        ["true", "color('lightgrey')"],
                    ]
                },
            });

            viewer.scene.primitives.add(tileset, index);
            return index;
        } catch (error) {
            console.error(`Error creating tileset: ${error}`);
        }
    }
}

const remove3DTileset = (index: number) => {
    const tilesetObj = viewer?.scene.primitives.get(index);
    if(tilesetObj) {
        viewer?.scene.primitives.remove(tilesetObj);
    }
}

const toggle3DTileset = (index: number) => {
    if(viewer) {
        const tilesetObj = viewer.scene.primitives.get(index);
        tilesetObj.show = !tilesetObj.show;
    }
}

const set3DTilesetTransparency = (index: number, transparency: number) => {
    const tilesetObj = viewer?.scene.primitives.get(index);
    if(tilesetObj) {
        tilesetObj.style = new Cesium.Cesium3DTileStyle({
            color: {
                conditions: [
                    ["true", `color('lightgrey', ${transparency})`],
                ]
            }
        });
    }
}

const set3DTilesetShadowMode = (index: number, mode: keyof typeof config.SHADOW_MODE) => {
    const tilesetObj = viewer?.scene.primitives.get(index);
    if(tilesetObj) {
        tilesetObj.shadows = config.SHADOW_MODE[mode];
    }
}

const zoomTo3DTileset = (index: number) => {
    const tilesetObj = viewer?.scene.primitives.get(index);

    if(tilesetObj) {
        viewer?.zoomTo(tilesetObj);
    }
}

const addGeoJsonData = (name, file, color) => {
    Cesium.GeoJsonDataSource.load(file, {
        stroke: Cesium.Color.fromCssColorString(color).withAlpha(0.5),
        fill: color,
        strokeWidth: 4,
        clampToGround: true,
    }).then((dataSource) => {
        dataSource.name = name;
        viewer?.dataSources.add(dataSource);
    });
}

const toggleGeoJsonData = (name) => {
    if(viewer) {
        const dataSource = viewer?.dataSources.getByName(name)[0];
        if(dataSource) {
            dataSource.show = !dataSource.show;
        }
    }
}

const zoomToGeoJsonData = (name) => {
    if(viewer) {
        const dataSource = viewer?.dataSources.getByName(name)[0];
        if(dataSource) {
            viewer?.zoomTo(dataSource);
        }
    }
}


const createClippingPlane = (index) => {
    if (viewer) {
        const tilesetObj = viewer.scene.primitives.get(index);

        if (tilesetObj instanceof Cesium.Cesium3DTileset) {
            const {BOX_SIZE, DIRECTIONS, parsingDirection, naming} = config.CLIPPING_OPTIONS;
            const planeEntities: Cesium.Entity[] = [];
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

            tilesetObj.clippingPlanes = clippingPlanes;

            const boundingSphere = tilesetObj.boundingSphere;
            const center = boundingSphere.center;

            let targetY =  BOX_SIZE / 2;

            const createPlaneUpdateFunction
                = (plane) => () => {
                plane.distance = targetY;
                return plane;
            }

            const size = BOX_SIZE;
            for (let j = 0; j < faces.length; j++) {
                const direction = faces[j].direction;
                const planeEntity = viewer.entities.add({
                    id: naming(index, direction),
                    position: center,
                    plane: {
                        dimensions: new Cesium.Cartesian2(size,size),
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

            tilesetObj.clippingPlanes.enabled = true;

            tilesetObj.clippingPlanes.edgeColor = Cesium.Color.WHITE;

            /**
             * HANDLER
             */
            const scene = viewer.scene;
            let selectedPlane = null;
            let selectedEntity = null;
            let direction = null;
            const handlerControl = new Cesium.ScreenSpaceEventHandler(scene.canvas);
            handlerControl.setInputAction(function (movement) {
                const pickedObject = scene.pick(movement.position);
                // console.log(pickedObject)
                if (
                    Cesium.defined(pickedObject) &&
                    Cesium.defined(pickedObject.id) &&
                    Cesium.defined(pickedObject.id.plane)
                ) {
                    selectedEntity = pickedObject.id;
                    selectedPlane = selectedEntity.plane;
                    direction = parsingDirection(selectedEntity.id);
                    selectedPlane.material = Cesium.Color.RED.withAlpha(0.05);
                    selectedPlane.outlineColor = Cesium.Color.RED;
                    scene.screenSpaceCameraController.enableInputs = false;
                }
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

            handlerControl.setInputAction(function () {
                if (Cesium.defined(selectedPlane)) {
                    selectedPlane.material = Cesium.Color.WHITE.withAlpha(0.1);
                    selectedPlane.outlineColor = Cesium.Color.WHITE;
                    selectedPlane = undefined;
                    direction = null;
                }
                scene.screenSpaceCameraController.enableInputs = true;
            }, Cesium.ScreenSpaceEventType.LEFT_UP);

            handlerControl.setInputAction(function (movement) {
                if (Cesium.defined(selectedEntity) && Cesium.defined(selectedPlane)) {
                    // Get Cartesian3 of intersection
                    const deltaY = (movement.startPosition.y - movement.endPosition.y) /2
                    targetY += deltaY;
                    // const pickedPosition = scene.pickPosition(movement.endPosition);
                    //
                    // for (let entity of planeEntities) {
                    //     entity.position = pickedPosition;
                    // }
                }
            }.bind(this), Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        }
    }
};

const set3DTilesetHeight = (index, height) => {
    if (viewer) {
        const tilesetObj = viewer.scene.primitives.get(index);
        const originStyle = tilesetObj.style;
        tilesetObj.style = new Cesium.Cesium3DTileStyle({
            color: originStyle.color,
            show:  {
                conditions: [
                    ["true", "${BLDH_HGT} < "+ height],
                ]
            }
        });
    }
}

const set3DTilesetFloor = (index, floor) => {
    if (viewer) {
        const tilesetObj = viewer.scene.primitives.get(index);
        const originStyle = tilesetObj.style;
        tilesetObj.style = new Cesium.Cesium3DTileStyle({
            color: originStyle.color,
            show:  {
                conditions: [
                    ["true", "${BFLR_CO} < "+ floor],
                ]
            }
        });
    }
}

export default {
    viewer,
    getViewer: (): Viewer | null => viewer,
    setCameraView,
    add3DTilesetAndGetIndex,
    remove3DTileset,
    toggle3DTileset,
    set3DTilesetTransparency,
    set3DTilesetShadowMode,
    zoomTo3DTileset,
    addGeoJsonData,
    toggleGeoJsonData,
    zoomToGeoJsonData,
    createClippingPlane,
    set3DTilesetHeight,
    set3DTilesetFloor,
    initMap: async (mapId: string) => {
        Cesium.Ion.defaultAccessToken = config.ACCESS_TOKEN;

        viewer = new Cesium.Viewer(mapId, {
            shouldAnimate: true,
            animation: true,
            fullscreenButton: false,
            timeline: true,
            geocoder: false, // toolbar
            homeButton: false, // toolbar
            baseLayerPicker: false, // toolbar
            sceneModePicker: false, // toolbar
            infoBox: false,
            selectionIndicator: false,
            navigationHelpButton: false, // toolbar,
            showRenderLoopErrors: false,
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        viewer.bottomContainer.style.visibility = 'hidden';

        viewer.camera.percentageChanged = 0.01;

        viewer.scene.globe.depthTestAgainstTerrain = true;

        viewer.shadows = true;

        viewer.terrainShadows = Cesium.ShadowMode.ENABLED;
        viewer.scene.shadowMap.size = 2048 * 5; //default 2048

        try {
            const terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(
                'http://192.168.10.3:8002/dem05_MSL', {
                    requestVertexNormals: true
                })
            viewer.terrainProvider = terrainProvider;
        } catch (error) {
            console.log(error);
        }

        setCameraView(config.DEFAULT_CAMERA_OPTION);
        // setKorDateTime();
    },

};
