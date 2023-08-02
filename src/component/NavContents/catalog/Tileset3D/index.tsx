import * as React from 'react';
import {Stack} from "@mui/material";

import Typography from '@mui/material/Typography';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

//icon
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import PropTypes from "prop-types";

import map from '../../../../map';
import { useEffect } from "react";


const Tileset3DCatalog = ({data}) => {

    const [subMenu, setSubMenu] = React.useState(false);

    const [show, setShow] = React.useState(true);

    const [transparency, setTransparency] = React.useState(100);

    useEffect(() => {
        map.add3DTileset(data.url, data.id);
    }, []);

    useEffect(() => {
        map.set3DTilesetStyle(data.id, transparency)
    }, [transparency]);

    const showData = async () => {
        setShow(!show);
        await map.toggle3DTileset(data.id, data.url);
    }

    const zoom = () => {
        map.zoomTo3DTileset(data.id);
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

                <IconButton variant="plain" onClick={() => setSubMenu(!subMenu)}>
                    {subMenu ? <KeyboardArrowDownIcon/> : <KeyboardArrowLeftIcon/>}
                </IconButton>
            </Stack>
            {
                subMenu ?
                    <Stack direction="row" alignItems="center" sx={{p: 1}}>
                        <Box sx={{'& button': {m: 1}}}>
                            <div>
                                <Button size="small" variant="outlined"
                                        onClick={zoom}>
                                    카메라
                                </Button>
                                <Button size="small" variant="outlined" disabled>
                                    데아터정보
                                </Button>
                                <Button size="small" variant="outlined" href="#outlined-buttons">
                                    X
                                </Button>
                            </div>
                            <div>
                                <Button variant="outlined" size="small">
                                    데이터 검색
                                </Button>
                            </div>
                            <div>
                                <Button variant="outlined" size="small">
                                    오픈데이터 얻기
                                </Button>
                            </div>
                            <div>
                                필터(건축물)
                            </div>
                            <div>
                                투명도
                                <Slider aria-label="Volume" step={0.1} marks min={0} max={1}
                                        value={transparency}
                                        onChange={(event: Event, newValue: number | number[]) => {
                                            setTransparency(newValue as number);
                                        }}
                                />
                            </div>
                            <div>
                                그림자
                            </div>
                            <div>
                                클리핑
                            </div>
                        </Box>
                    </Stack>
                    : null
            }
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
