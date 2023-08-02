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

const toggle3DTileset = async (index: number) => {
    if(viewer) {
        const tilesetObj = viewer.scene.primitives.get(index);
        tilesetObj.show = !tilesetObj.show;
    }
}

const set3DTilesetStyle = async (index: number, transparency: number) => {
    const tilesetObj = viewer?.scene.primitives.get(index);
    console.log(index, transparency)
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

const zoomTo3DTileset = (index: number) => {
    const tilesetObj = viewer?.scene.primitives.get(index);

    if(tilesetObj) {
        viewer?.zoomTo(tilesetObj);
    }
}
// const findDataSourceByName = (name) => {
//     let dataSource = viewer?.dataSources.getByName(name);
//     debugger
//     if ( dataSource || dataSource.length === 0) {
//         dataSource.name = name;
//         viewer.dataSources.add(dataSource);
//     } else {
//         dataSource = dataSource[0];
//     }
//     return dataSource;
// }

//
const addGeoJsonData = (file, color) => {
    viewer?.dataSources.add(Cesium.GeoJsonDataSource.load(file, {
        stroke: Cesium.Color.fromCssColorString(color).withAlpha(0.5),
        fill: color,
        strokeWidth: 4,
        clampToGround: true,
    }));
}
//
// const toggleGeoJsonData = (name, dataList) => {
//     const dataSource = findDataSourceByName(name);
//     if(dataSource?.length === 0) {
//       for(const data of dataList) {
//           addGeoJsonData(name, data.file, data.color);
//       }
//     }else {
//         dataSource.show = !dataSource.show;
//     }
// }

export default {
    viewer,
    getViewer: (): Viewer | null => viewer,
    setCameraView,
    add3DTilesetAndGetIndex,
    toggle3DTileset,
    set3DTilesetStyle,
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
        setKorDateTime();
    },

};
