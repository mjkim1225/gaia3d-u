import React, { useState } from 'react';
import {IconButton, Typography, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import mapConfig from "../../../../map/config";

const shadowMode = mapConfig.SHADOW_MODE;
type ShadowModeType = keyof typeof shadowMode;

const SHADOW_MODE_OPTIONS: { label: string; value: ShadowModeType }[] = [
    { label: 'Disabled', value: 'DISABLED' },
    { label: 'Enabled', value: 'ENABLED' },
    { label: 'Cast Only', value: 'CAST_ONLY' },
    { label: 'Receive Only', value: 'RECEIVE_ONLY' },
];
const Shadow = ({ tileset }) => {
    const [open, setOpen] = useState(true);

    const toggleContent = () => {
        setOpen(!open);
    };

    const [selectedMode, setSelectedMode] = useState<ShadowModeType>('ENABLED');
    const handleModeChange = (event: SelectChangeEvent<ShadowModeType>) => {
        const mode = event.target.value as ShadowModeType;
        setSelectedMode(mode);
        tileset.setShadowMode(mode);
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
                <Typography variant="body1" sx={{ textAlign: 'left', pl: '10px'}}> 그림자 </Typography>
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
                </Box>
            )}
        </Box>
    );
};

export default Shadow;
