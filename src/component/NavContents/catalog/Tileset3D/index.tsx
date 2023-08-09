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

import map from '../../../../map';

import PropTypes from "prop-types";

import Filter from "./Filter";
import Transparency from "./Transparency";
import Shadow from "./Shadow";
import Clipping from "./Clipping";
import Coloring from "./Coloring";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";


const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#F5F5F5',
    ...theme.typography.body2,
    padding: "1px",
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
}));

const Tileset3DCatalog = ({ data }) => {
    const [subMenu, setSubMenu] = useState(false);
    const [show, setShow] = useState(true);

    // @ts-ignore
    const [tileset, setTileset] = useState<map.Gaia3DTileset | null>(null);

    // 실제 데이터를 remove 하지않고, 컴포넌트만 지운다
    // 이유: 데이터를 실제로 list에서 remove 하면 컴포넌트를 다시생성하는데, 그때 Gaia** 객체들도 다시 생성된다.. 따라서 기능이 제대로 수행이 안됨
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const viewer = map.getViewer();
        const _tileset = new map.Gaia3DTileset(viewer, data.url);
        setTileset(_tileset);
        zoom();

        return () => {
            setTileset(null);
        }
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
        setIsVisible(false);
    }

    if (!isVisible) {
        return null; // isVisible이 false일 때는 컴포넌트를 렌더링하지 않음
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>
                <Item sx={{ my: 1, mx: 'auto', p: 1 }}>
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
                </Item>
            </Box>
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
