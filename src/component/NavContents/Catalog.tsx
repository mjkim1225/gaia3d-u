import React, {useState} from 'react';
import {Button, Stack} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import CatalogContent from "./catalog/CatalogContent";
import CatalogSearch from "./catalog/CatalogSearch";

const Catalog = () => {

    const [openSearch, setOpenSearch] = useState(false);

    const [dataList, setDataList] = useState([]);
    const addNewData = (newData) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
            <CatalogContent dataList={dataList} setDataList={setDataList}/>
            <CatalogSearch open={openSearch}
                           close={() => setOpenSearch(false)}
                           addNewData={(data) => addNewData(data)}
            />
        </>

    );
}

export default Catalog;
