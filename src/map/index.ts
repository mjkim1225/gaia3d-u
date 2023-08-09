import * as Cesium from 'cesium';

import {CameraOption} from "./types";
import config from './config';

import Gaia3DTileset from "./3Dtileset/Gaia3DTileset";
import GaiaGeoJsonDataSource from "./GeoJson/GaiaGeoJsonDataSource";

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

export default {
    viewer,
    getViewer: (): Viewer | null => viewer,
    setCameraView,

    Gaia3DTileset, GaiaGeoJsonDataSource,

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
