import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Slider from "@mui/material/Slider";
import ConditionTemplate from '../common/ConditionTemplate';  // Importing Condition from the new location

const Filter = ({ tileset }) => {
    const [open, setOpen] = useState(true);

    const toggleContent = () => {
        setOpen(!open);
    };

    const [height, setHeight] = useState(200);
    const changeHeight = (value) => {
        setHeight(value)
        tileset.addStyleShow("BLDH_HGT", "${BLDH_HGT} < " + height);
    }
    const [floor, setFloor] = useState(50);
    const changeFloor = (value) => {
        setFloor(value)
        tileset.addStyleShow("BFLR_CO", "${BFLR_CO} < " + floor);
    }

    return (
        <ConditionTemplate title="필터(건축물)" open={open} toggleContent={toggleContent}>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
                - 높이로 필터 0~200
            </Typography>

            <Slider aria-label="Volume" step={1} min={0} max={200}
                    value={height}
                    valueLabelDisplay="auto"
                    onChange={(event, newValue) => {
                        changeHeight(newValue);
                    }}
            />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
                - 건물 층수로 필터 0~50
            </Typography>
            <Slider aria-label="Volume" step={1} min={0} max={50}
                    value={floor}
                    valueLabelDisplay="auto"
                    onChange={(event, newValue) => {
                        changeFloor(newValue);
                    }}
            />
        </ConditionTemplate>
    );
};

export default Filter;
