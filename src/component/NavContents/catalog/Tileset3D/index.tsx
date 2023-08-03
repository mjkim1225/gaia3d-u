import React, { useEffect, useState } from 'react';
import { SelectChangeEvent, Stack } from "@mui/material";

import Typography from '@mui/material/Typography';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Switch from '@mui/joy/Switch';

//icon
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import PropTypes from "prop-types";

import map from '../../../../map';
import mapConfig from '../../../../map/config';

import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const shadowMode = mapConfig.SHADOW_MODE;
type ShadowModeType = keyof typeof shadowMode;

const SHADOW_MODE_OPTIONS: { label: string; value: ShadowModeType }[] = [
    { label: 'Disabled', value: 'DISABLED' },
    { label: 'Enabled', value: 'ENABLED' },
    { label: 'Cast Only', value: 'CAST_ONLY' },
    { label: 'Receive Only', value: 'RECEIVE_ONLY' },
];

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

    const [selectedMode, setSelectedMode] = useState<ShadowModeType>('ENABLED');
    const handleModeChange = (event: SelectChangeEvent<ShadowModeType>) => {
        const mode = event.target.value as ShadowModeType;
        setSelectedMode(mode);
        map.set3DTilesetShadowMode(dataIndex, mode);
    };

    const showData = () => {
        setShow(!show);
        map.toggle3DTileset(dataIndex);
    }

    const [transparency, setTransparency] = useState(1);

    const changeTransparency = (value) => {
        setTransparency(value)
        map.set3DTilesetTransparency(dataIndex, value)
    };

    const remove3DTileset = () => {
        map.remove3DTileset(dataIndex);
        removeData(data);
    }

    const [clipping, setClipping] = React.useState<boolean>(false);

    useEffect(() => {
        if(clipping) map.createClippingPlane(dataIndex);
    }, [clipping]);

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
            {subMenu ? (
                <Stack direction="column" spacing={1} >
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
                        <div>
                            <Button variant="outlined" size="small" sx={{ width: '90%' }}>
                                데이터 검색
                            </Button>
                        </div>
                        <div>
                            <Button variant="outlined" size="small" sx={{ width: '90%' }}>
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
                                        changeTransparency(newValue as number);
                                    }}
                            />
                        </div>
                        <div>
                            그림자
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="shadow-mode-label">Shadow Mode</InputLabel>
                                <Select
                                    labelId="shadow-mode-label"
                                    id="shadow-mode-select"
                                    value={selectedMode}
                                    onChange={handleModeChange}
                                    label="Shadow Mode"
                                >
                                    {SHADOW_MODE_OPTIONS.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            클리핑
                            <Switch
                                checked={clipping}
                                onChange={(event) => setClipping(event.target.checked)}
                            />
                        </div>
                        <div>
                            색으로 구분 (건축물)
                        </div>
                    </Box>
                </Stack>
            ) : null}
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
