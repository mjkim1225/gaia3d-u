import React, {useState} from 'react';
import {Button, Stack} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import CatalogSearch from "./CatalogSearch";

import CatalogList from "./CatalogList";
import {CatalogType} from "../../../types";

const Catalog = () => {

    const [openSearch, setOpenSearch] = useState(false);

    const [catalogList, setCatalogList] = useState<CatalogType[]>([]);
    const addNewData = (newData) => {
        // @ts-ignore
        setCatalogList((prevList) => [...prevList, newData]);
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
            <CatalogList catalogList={catalogList} />
            <CatalogSearch open={openSearch}
                           close={() => setOpenSearch(false)}
                           addNewData={(data) => addNewData(data)}
            />
        </>

    );
}

export default Catalog;
