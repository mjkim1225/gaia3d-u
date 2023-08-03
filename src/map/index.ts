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

const toggle3DTileset = async (index: number) => {
    if(viewer) {
        const tilesetObj = viewer.scene.primitives.get(index);
        tilesetObj.show = !tilesetObj.show;
    }
}

const set3DTilesetTransparency = async (index: number, transparency: number) => {
    const tilesetObj = viewer?.scene.primitives.get(index);
    if(tilesetObj) {
        tilesetObj.style = new Cesium.Cesium3DTileStyle({
            color: {
                conditions: [
                    ["true", `color('lightgrey', ${transparency})`],
                ]
            },
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

const addGeoJsonData = (file, color) => {
    viewer?.dataSources.add(Cesium.GeoJsonDataSource.load(file, {
        stroke: Cesium.Color.fromCssColorString(color).withAlpha(0.5),
        fill: color,
        strokeWidth: 4,
        clampToGround: true,
    }));
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
