import React, {useState} from 'react';
import {Button, Stack} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import CatalogSearch from "./CatalogSearch";
import Tileset3DCatalog from "./Tileset3D";
import LineCatalog from "./Line";

const Catalog = () => {

    const [openSearch, setOpenSearch] = useState(false);

    const [dataList, setDataList] = useState([]);
    const addNewData = (newData) => {
        // @ts-ignore
        setDataList((prevList) => [...prevList, newData]);
    };

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
            {
                dataList.map((data) =>  {
                    return data.type === '3DTileset' ? (
                        <Tileset3DCatalog key={dataList.indexOf(data)} data={data} />
                    ) : data.type === 'line' ? (
                        <LineCatalog key={dataList.indexOf(data)} data={data} />
                    ) : null
                })
            }
            <CatalogSearch open={openSearch}
                           close={() => setOpenSearch(false)}
                           addNewData={(data) => addNewData(data)}
            />
        </>

    );
}

export default Catalog;
