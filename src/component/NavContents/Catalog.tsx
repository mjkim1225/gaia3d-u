import * as React from 'react';
import {Button, Stack} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import CatalogContent from "../CatalogContent";

const Catalog = () => {

    return (
        <>
        <Stack alignItems="center" spacing={3} sx={{pt: 5, borderRadius: 2, position: 'relative'}}>
            <Button variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
            >
                SEARCH CATALOG
            </Button>
        </Stack>
            <CatalogContent />
        </>

    );
}

export default Catalog;
