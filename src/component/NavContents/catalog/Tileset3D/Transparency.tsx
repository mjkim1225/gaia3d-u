import React, { useState } from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Slider from "@mui/material/Slider";

const Transparency = ({ tileset }) => {
    const [open, setOpen] = useState(true);

    const toggleContent = () => {
        setOpen(!open);
    };

    const [transparency, setTransparency] = useState(1);

    const changeTransparency = (value) => {
        setTransparency(value)
        tileset.setTransparency(value);
    };

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
                <Typography variant="body1" sx={{ textAlign: 'left' }}> 투명도 </Typography>
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
                    <Slider aria-label="Volume" step={0.1} marks min={0} max={1}
                            value={transparency}
                            valueLabelDisplay="auto"
                            onChange={(event: Event, newValue: number | number[]) => {
                                changeTransparency(newValue as number);
                            }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Transparency;
