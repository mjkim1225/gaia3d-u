import * as Cesium from 'cesium';

import {CameraOption} from "./types";
import config from './config';

import Gaia3DTileset from "./3Dtileset/Gaia3DTileset";

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


const addGeoJsonData = (name, file, color) => {
    Cesium.GeoJsonDataSource.load(file, {
        stroke: Cesium.Color.fromCssColorString(color),
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

const createClippingPlane = (index) => {
    if (viewer) {
        const tilesetObj = viewer.scene.primitives.get(index);

        if (tilesetObj instanceof Cesium.Cesium3DTileset) {
            const {BOX_SIZE, DIRECTIONS, naming} = config.CLIPPING_OPTIONS;
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

            let targetY = (-1) * BOX_SIZE / 2;

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
            let selectedPlane = undefined;
            let selectedEntity = undefined;
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
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    selectedPlane = selectedEntity.plane;
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    selectedPlane.material = Cesium.Color.RED.withAlpha(0.05); selectedPlane.outlineColor = Cesium.Color.RED;
                    scene.screenSpaceCameraController.enableInputs = false;
                }
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

            handlerControl.setInputAction(function () {
                if (Cesium.defined(selectedPlane)) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    selectedPlane.material = Cesium.Color.WHITE.withAlpha(0.1); selectedPlane.outlineColor = Cesium.Color.WHITE;

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    selectedEntity = undefined; selectedPlane = undefined;
                }
                scene.screenSpaceCameraController.enableInputs = true;
            }, Cesium.ScreenSpaceEventType.LEFT_UP);

            handlerControl.setInputAction(function (movement) {
                if (Cesium.defined(selectedEntity) && Cesium.defined(selectedPlane)) {
                    // Get Cartesian3 of intersection
                    // const deltaY = (movement.startPosition.y - movement.endPosition.y) ;
                    // targetY += -1 * deltaY;
                    const pickedPosition = scene.pickPosition(movement.endPosition);

                    for (const entity of planeEntities) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        entity.position = pickedPosition;
                    }
                }
            }.bind(this), Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        }
    }
};

export default {
    viewer,
    getViewer: (): Viewer | null => viewer,
    setCameraView,

    Gaia3DTileset,

    addGeoJsonData,
    toggleGeoJsonData,
    createClippingPlane,
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
        // 그림자 크기 : 높을수록 자연스러운 느낌
        viewer.scene.shadowMap.size = 2048 * 5; //default 2048

        try {
            viewer.terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(
                'http://192.168.10.3:8002/dem05_MSL', {
                    requestVertexNormals: true
                });
        } catch (error) {
            console.log(error);
        }

        setCameraView(config.DEFAULT_CAMERA_OPTION);
        // setKorDateTime();
    },

};
