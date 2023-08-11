import Gaia3DTileset from "../map/3Dtileset/Gaia3DTileset";
import GaiaGeoJsonDataSource from "../map/GeoJson/GaiaGeoJsonDataSource";

type CameraOption = {
    longitude: number,
    latitude: number,
    altitude: number,
    heading: number,
    pitch: number,
    roll: number,
};

export type TilesetType = {
    id: number,
    type: string,
    nameKor: string,
    nameEng: string,
    cityKor: string,
    cityEng: string,
    tileset: string,
    url: string,
    cameraOption: CameraOption,
};

export type LineType = {
    id: number,
    type: string,
    nameKor: string,
    nameEng: string,
    cityKor: string,
    cityEng: string,
    cameraOption: CameraOption,
    dataList: {
        id: number,
        nameEng: string,
        nameKor: string,
        color: string,
        url: string
    }[],
};

export type GaiaObjType = {
    id: number,
    catalog: CatalogType,
    gaiaObj: Gaia3DTileset | GaiaGeoJsonDataSource,
}

export type CatalogType = TilesetType | LineType | null;
export type UsageCatalogType = CatalogType & {
    usage?: boolean; // 새로운 키밸류 추가
};
