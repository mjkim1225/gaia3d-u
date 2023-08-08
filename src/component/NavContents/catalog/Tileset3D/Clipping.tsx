import React, {useEffect, useState} from 'react';
import {IconButton, Typography, Box} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Switch from "@mui/joy/Switch";


const Clipping = ({ tileset }) => {
    const [open, setOpen] = useState(true);

    const toggleContent = () => {
        setOpen(!open);
    };

    const [clipping, setClipping] = React.useState<boolean>(false);

    useEffect(() => {
        if(clipping) console.log("준비중~")
    }, [clipping]);

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
                <Typography variant="body1" sx={{ textAlign: 'left' }}> 클리핑 </Typography>
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
                    <Typography variant="body1" > 활성화 </Typography>
                    <Switch
                        checked={clipping}
                        onChange={(event) => setClipping(event.target.checked)}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Clipping;
