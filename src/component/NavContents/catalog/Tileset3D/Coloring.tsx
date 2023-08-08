import React, {useState} from 'react';
import {IconButton, Typography, Box} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


const Coloring = ({ tileset }) => {
    const [open, setOpen] = useState(true);

    const toggleContent = () => {
        setOpen(!open);
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
                <Typography variant="body1" sx={{ textAlign: 'left' }}> 색으로 구분 (건축물) </Typography>
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
                    <Typography variant="body1" > 색상분리없음 </Typography>
                    <Typography variant="body1" > 높이별 도장 </Typography>

                </Box>
            )}
        </Box>
    );
};

export default Coloring;
