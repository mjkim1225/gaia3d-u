import React, {useState} from 'react';
import {Button, Stack} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import CatalogSearch from "./CatalogSearch";

import CatalogList from "./CatalogList";
import {CatalogType} from "../../../types";
import Gaia3DTileset from "../../../map/3Dtileset/Gaia3DTileset";
import map from "../../../map";
import GaiaGeoJsonDataSource from "../../../map/GeoJson/GaiaGeoJsonDataSource";
import useGaiaObjListStore from "../../../store/useGaiaObjListStore";

const Catalog = () => {

    const [openSearch, setOpenSearch] = useState(false);

    const {gaiaObjList, addGaiaObj, removeGaiaObjById} = useGaiaObjListStore();

    const addNewData = (newData: CatalogType) => {
        // @ts-ignore
        const viewer = map.getViewer();
        if(newData?.type === '3DTileset') {
            // @ts-ignore
            const tileset = new Gaia3DTileset(viewer, newData?.url);
            addGaiaObj({id: newData.id, catalog: newData, gaiaObj: tileset});
        }else if(newData?.type === 'line') {
            // @ts-ignore
            const line = new GaiaGeoJsonDataSource(viewer, newData?.dataList);
            addGaiaObj({id: newData.id, catalog: newData, gaiaObj: line});
        }
    };

    const removeGaiaObj = (id) => {
        removeGaiaObjById(id)
    }

    return (
        <>
        <Stack alignItems="center" spacing={3} sx={{pt: 5, borderRadius: 2, position: 'relative', padding: 0}}>
            <Button variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => setOpenSearch(true)}
            >
                SEARCH CATALOG
            </Button>
        </Stack>
            <CatalogList gaiaObjList={gaiaObjList} removeData={removeGaiaObj}/>
            <CatalogSearch open={openSearch}
                           close={() => setOpenSearch(false)}
                           addNewData={(data) => addNewData(data)}
            />
        </>

    );
}

export default Catalog;
