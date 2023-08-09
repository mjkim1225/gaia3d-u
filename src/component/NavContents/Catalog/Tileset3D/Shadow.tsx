import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import ConditionTemplate from '../common/ConditionTemplate';

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
        <ConditionTemplate title="그림자" open={open} toggleContent={toggleContent}>
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
        </ConditionTemplate>
    );
};

export default Shadow;
