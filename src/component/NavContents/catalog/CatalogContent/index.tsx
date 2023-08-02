import * as React from 'react';

import Box from '@mui/material/Box';

import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Tileset3DCatalog from "../Tileset3D";
import LineCatalog from "../Line";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
}));

const CatalogContent = ({ dataList }) => {
    return (
        <>
            {dataList.map((data) => (
                <Box key={data.id} sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
                    <Item sx={{ my: 1, mx: 'auto', p: 1 }}>
                        {data.type === '3DTileset' ? (
                            <Tileset3DCatalog data={data} />
                        ) : data.type === 'line' ? (
                            <LineCatalog data={data} />
                        ) : null}
                    </Item>
                </Box>
            ))}
        </>
    );
};
export default CatalogContent;
