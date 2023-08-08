import * as React from 'react';

import Box from '@mui/material/Box';

import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Tileset3DCatalog from "../Tileset3D";
import LineCatalog from "../Line";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#F5F5F5',
    ...theme.typography.body2,
    padding: "1px",
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
}));

const CatalogContent = ({ dataList, setDataList }) => {

    const removeData = (data) => {
        setDataList((prevList) => prevList.filter((d) => d !== data));
    }

    return (
        <>
            {dataList.map((data) => (
                <Box key={dataList.indexOf(data)} sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>
                    <Item sx={{ my: 1, mx: 'auto', p: 1 }}>
                        {data.type === '3DTileset' ? (
                            <Tileset3DCatalog data={data} removeData={() => removeData(data) }/>
                        ) : data.type === 'line' ? (
                            <LineCatalog data={data} removeData={() => removeData(data) }/>
                        ) : null}
                    </Item>
                </Box>
            ))}
        </>
    );
};
export default CatalogContent;
