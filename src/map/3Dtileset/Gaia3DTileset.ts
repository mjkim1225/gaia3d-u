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
            conditions: [['true', "color('#D3D3D3')"]],
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

    setShadowMode (mode: keyof typeof config.SHADOW_MODE) {
        if(this.tilesetObj) {
            this.tilesetObj.shadows = config.SHADOW_MODE[mode];
        }
    }

    setTransparency (transparency: number) {
        if(this.tilesetObj) {
            const conditions = this.color.conditions;
            for (let i = 0; i < conditions.length; i++) {
                conditions[i][1] = conditions[i][1].replace(/color\('([#A-Fa-f0-9]+)'\)/, "color('$1', " + transparency + ")");
                conditions[i][1] = conditions[i][1].replace(/color\('([#A-Fa-f0-9]+)',\s*(\d+(\.\d+)?)\)/, "color('$1', " + transparency + ")");
            }
            this.color = {
                conditions
            }
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
        const showConditions = this.show.conditions;
        let show = {
            conditions: [["false", "false"]],
        };

        if (showConditions.length > 0) {
            const wholeConditions = showConditions
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
            // const cameraPosition = camera.position;
            // const cameraDirection = camera.direction;
            // const ray = new Cesium.Ray(cameraPosition, cameraDirection);
            // const position = scene?.globe.pick(ray, scene);

            const boundingSphere = this.tilesetObj.boundingSphere;
            const position = boundingSphere.center;

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


/**
 * 3d tileset 필드
 *
 * 필드 명칭 필드 내용 속성 타입 길이
 * NF_ID 고유식별자 아이디 VARCHAR 17
 * MOLIT_UFID 국토부 UFID VARCHAR 17
 * BPRP_SE 건물용도 구분 VARCHAR 6 ( 종교시설 / 공장 /창고시설 ...) (✓)
 * BULD_NM 건물 명칭 VARCHAR 200
 * BATC_NM 건물부속 명칭 VARCHAR 200
 * BULD_SE 건물 구분 VARCHAR 6 ( 알반주택/ 연립주택/ 주택외건물 ...) (✓)
 * BFLR_CO 건물층 수 NUMERIC 3
 * PNU_NO PNU 번호 VARCHAR 19
 * USECON_DE 사용승인 일 VARCHAR 8 (✓)
 * RNCODE_DC 도로명코드 설명 VARCHAR 7
 * BLDMN_NO 건물본번 번호 NUMERIC 5
 * BLDSL_NO 건물부번 번호 NUMERIC 5
 * BLDSUB_BO 건물 부분 번호 NUMERIC 2
 * PHY_LV 물리적 위상 수준 NUMERIC 2
 * BLDH_MN 건축물 최저높이 NUMERIC 5,2
 * BLDH_MX 건축물 최고높이 NUMERIC 5,2
 * BLDH_BV 기준높이 NUMERIC 5,2
 * BLDFH_MX 시설물 최고높이 NUMERIC 5,2
 * REFNF_ID 참조 NFID VARCHAR 17
 * CSCHG_SE 수정상태 구분 VARCHAR 6
 * OBJECT_GT 객체 지오메트리 MULTIPOLYGON
 * OBCHG_DT 객체변동 일시 TIMESTAMP
 * MESRMTH_SE 수정측량방법 구분 VARCHAR 1
 * RSREG_DT 성과등록 일시 TIMESTAMP
 * MNENT_NM 제작업체 명 VARCHAR 100
 * DBREG_DT 데이터베이스등록 일시 TIMESTAMP
 * BLDH_HGT : 14.64488 (빌딩 높이로 사용한다) **** 새로만든데이터 (✓)
 *
 * 예시
 * Longitude : 2.258210484254907
 * Latitude : 0.620378574165031
 * Height : 5.002119
 * Name : BLD01000000389TG3
 * NF_ID : BLD01000000389TG3
 * MOLIT_UFID : B00100000009XXKIK
 * BPRP_SE : BDU010
 * BULD_NM : 0
 * BATC_NM : 양정초교가온누리관
 * BULD_SE : BDC004
 * BFLR_CO : 4
 * PNU_NO : 3120012400104700000
 * USECON_DE : 0
 * RNCODE_DC : 4316217
 * BLDMN_NO : 11
 * BLDSL_NO : 0
 * BLDH_MN : 5.002119
 * BLDH_MX : 0
 * BLDH_BV : 19.646999
 * BLDFH_MX : 0
 * REFNF_ID : ARB0400000000V6XE
 * OBCHG_DT : 2021-08-31
 * MESRMTH_SE : P
 * RSREG_DT : 2021-08-31
 * CSCHG_SE : CSC999
 * MNENT_NM : (주)한양지에스티
 * DBREG_DT : 2021-08-31
 * CTPT_NF_ID : BLD06000000389TG8
 */
