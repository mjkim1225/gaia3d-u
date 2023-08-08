import * as Cesium from 'cesium';

export default class GaiaGeoJsonDataSource {
    private viewer: Cesium.Viewer | null;
    private dataSourceList: Cesium.GeoJsonDataSource[] = [];

    constructor(viewer: Cesium.Viewer | null, dataList: {
        nameEng: string,
        url: string,
        color: string
    }[]) {
        this.viewer = viewer;

        for(const data of dataList) {
            const {nameEng, url, color} = data;
            Cesium.GeoJsonDataSource.load(url, {
                stroke: Cesium.Color.fromCssColorString(color),
                // @ts-ignore
                fill: color,
                strokeWidth: 4,
                clampToGround: true,
            }).then((dataSource) => {
                dataSource.name = nameEng;
                viewer?.dataSources.add(dataSource);
                this.dataSourceList.push(dataSource);
            });
        }

    }

    toggle() {
        if(this.dataSourceList.length > 0) {
            for(const dataSource of this.dataSourceList) {
                dataSource.show = !dataSource.show;
            }
        }
    }

    remove() {
        if(this.dataSourceList.length > 0) {
            for(const dataSource of this.dataSourceList) {
                this.viewer?.dataSources.remove(dataSource);
            }
        }
    }
}
