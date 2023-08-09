// Coloring.js
import React, { useState } from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import ConditionTemplate from '../common/ConditionTemplate';

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
        <ConditionTemplate title="색으로 구분 (건축물)" open={open} toggleContent={toggleContent}>
            <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                <FormControlLabel value="noColor" control={<Radio />} label="색상분리없음" />
                <FormControlLabel value="heightBased" control={<Radio />} label="높이별 도장" />
            </RadioGroup>
        </ConditionTemplate>
    );
};

export default Coloring;
