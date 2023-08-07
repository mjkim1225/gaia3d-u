import React, { useState } from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Slider from "@mui/material/Slider";
import map from "../../../../map";

const Filter = ({ dataIndex }) => {
    const [open, setOpen] = useState(true);

    const toggleContent = () => {
        setOpen(!open);
    };

    const [height, setHeight] = useState(200);
    const changeHeight = (value) => {
        setHeight(value)
        map.set3DTilesetHeight(dataIndex, value)
    }
    const [floor, setFloor] = useState(50);
    const changeFloor = (value) => {
        setFloor(value)
        map.set3DTilesetFloor(dataIndex, value)
    }

    return (
        <Box sx={{ backgroundColor: 'white' ,border: '1px solid grey', margin: '5px', borderRadius: '5px', position: 'relative' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    borderBottom: '1px solid grey',
                }}
            >
                <Typography variant="body1" sx={{ textAlign: 'left' }}> 필터(건축물)</Typography>
                <IconButton onClick={toggleContent} sx={{ position: 'absolute', right: 0 }}>
                    {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowLeftIcon />}
                </IconButton>
            </Box>
            {open && (
                <Box
                    sx={{
                        borderTop: 'none',
                        padding: '10px',
                    }}
                >
                    <Typography variant="body1" sx={{ textAlign: 'left' }}>
                        - 높이로 필터 0~200
                    </Typography>

                    <Slider aria-label="Volume" step={1} min={0} max={200}
                            value={height}
                            onChange={(event: Event, newValue: number | number[]) => {
                                changeHeight(newValue as number);
                            }}
                    />
                    <Typography variant="body1" sx={{ textAlign: 'left' }}>
                        - 건물 층수로 필터 0~50
                    </Typography>
                    <Slider aria-label="Volume" step={1} min={0} max={50}
                            value={floor}
                            onChange={(event: Event, newValue: number | number[]) => {
                                changeFloor(newValue as number);
                            }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Filter;