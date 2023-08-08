import React, { useEffect, useState } from 'react';
import { Stack } from "@mui/material";

import Typography from '@mui/material/Typography';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

//icon
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import PropTypes from "prop-types";

import map from '../../../../map';

import Filter from "./Filter";
import Transparency from "./Transparency";
import Shadow from "./Shadow";
import Clipping from "./Clipping";
import Coloring from "./Coloring";

const Tileset3DCatalog = ({ data, removeData }) => {
    const [subMenu, setSubMenu] = useState(false);
    const [show, setShow] = useState(true);
    const [dataIndex, setDataIndex] = useState(0);

    useEffect(() => {
        map.add3DTilesetAndGetIndex(data.url).then(
            (index) => {
                if (index !== undefined) {
                    setDataIndex(index);
                    map.zoomTo3DTileset(index);
                }
            }
        );
    }, []);

    const zoom = () => {
        map.zoomTo3DTileset(dataIndex);
    }

    const showData = () => {
        setShow(!show);
        map.toggle3DTileset(dataIndex);
    }

    const remove3DTileset = () => {
        map.remove3DTileset(dataIndex);
        removeData(data);
    }

    return (
        <>
            <Stack direction="row" alignItems="center" sx={{p: 1}}>
                <IconButton variant="plain">
                    <DragIndicatorIcon/>
                </IconButton>
                <IconButton variant="plain" onClick={showData}>
                    {show ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                </IconButton>

                <Typography noWrap> {data.nameKor} </Typography>

                <IconButton variant="plain" onClick={() => setSubMenu(!subMenu)}
                            sx={{
                                position: 'absolute',
                                right: "5%",
                            }}
                >
                    {subMenu ? <KeyboardArrowDownIcon/> : <KeyboardArrowLeftIcon/>}
                </IconButton>
            </Stack>
            <Stack direction="column" spacing={1} sx={{ display: subMenu? 'block' : 'none'}}>
                <Box sx={{ '& button': { m: 1 } }}>
                    <div>
                        <Button size="small" variant="contained" onClick={zoom} sx={{ width: '30%' }}>
                            카메라
                        </Button>
                        <Button size="small" variant="outlined" disabled sx={{ width: '30%' }}>
                            데아터정보
                        </Button>
                        <Button size="small" variant="contained" href="#outlined-buttons" onClick={remove3DTileset} sx={{ width: '10%' }}>
                            <DeleteForeverIcon />
                        </Button>
                    </div>
                    <Filter dataIndex={dataIndex} />
                    <Transparency dataIndex={dataIndex} />
                    <Shadow dataIndex={dataIndex}/>
                    <Clipping dataIndex={dataIndex}/>
                    <Coloring dataIndex={dataIndex}/>
                </Box>
            </Stack>
        </>
    );
}

Tileset3DCatalog.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nameKor: PropTypes.string.isRequired,
        nameEng: PropTypes.string.isRequired,
        cityKor: PropTypes.string.isRequired,
        cityEng: PropTypes.string.isRequired,
        tileset: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    })
};

export default Tileset3DCatalog;
