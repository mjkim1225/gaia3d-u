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

    // @ts-ignore
    const [tileset, setTileset] = useState<map.Gaia3DTileset | null>(null);

    useEffect(() => {
        const viewer = map.getViewer();
        const _tileset = new map.Gaia3DTileset(viewer, data.url);
        setTileset(_tileset);
        zoom();
    }, []);

    const zoom = () => {
        map.setCameraView(data.cameraOption);
    }

    const showData = () => {
        tileset.toggle();
        setShow(!show);
    }

    const remove3DTileset = () => {
        tileset.remove();
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
                        <Button size="small"
                                sx={{ width: '10%' }}
                                variant="contained"
                                href="#outlined-buttons"
                                onClick={remove3DTileset} >
                            <DeleteForeverIcon />
                        </Button>
                    </div>
                    <Filter tileset={tileset} />
                    <Transparency tileset={tileset} />
                    <Shadow tileset={tileset}/>
                    <Clipping tileset={tileset}/>
                    <Coloring tileset={tileset}/>
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
