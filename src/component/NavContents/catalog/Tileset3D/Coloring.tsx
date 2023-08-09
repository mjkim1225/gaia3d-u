import React, { useState } from 'react';
import { IconButton, Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const Coloring = ({ tileset }) => {
    const [open, setOpen] = useState(true);
    const [selectedOption, setSelectedOption] = useState('noColor');

    const toggleContent = () => {
        setOpen(!open);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Box sx={{ backgroundColor: 'white', border: '1px solid grey', margin: '5px', borderRadius: '5px', position: 'relative' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    borderBottom: '1px solid grey',
                }}
            >
                <Typography variant="body1" sx={{ textAlign: 'left', pl: '10px'}}> 색으로 구분 (건축물) </Typography>
                <IconButton onClick={toggleContent} sx={{ position: 'absolute', right: 0 }}>
                    {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowLeftIcon />}
                </IconButton>
            </Box>
            {open && (
                <Box
                    sx={{
                        borderTop: 'none',
                        pl: '20px', pt: '5px', pb: '5px',
                    }}
                >
                    <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                        <FormControlLabel value="noColor" control={<Radio />} label="색상분리없음" />
                        <FormControlLabel value="heightBased" control={<Radio />} label="높이별 도장" />
                    </RadioGroup>
                </Box>
            )}
        </Box>
    );
};

export default Coloring;
