import React, {useEffect, useState} from 'react';
import Slider from "@mui/material/Slider";
import ConditionTemplate from '../common/ConditionTemplate';

const Transparency = ({ tileset }) => {
    const [open, setOpen] = useState(true);

    const toggleContent = () => {
        setOpen(!open);
    };

    const [transparency, setTransparency] = useState(0.8);

    const changeTransparency = (value) => {
        setTransparency(value)
    };

    useEffect(() => {
        tileset.setTransparency(transparency);
    }, [transparency]);

    return (
        <ConditionTemplate title="투명도" open={open} toggleContent={toggleContent}>
            <Slider aria-label="Volume" step={0.1} marks min={0} max={1}
                    value={transparency}
                    valueLabelDisplay="auto"
                    onChange={(event, newValue) => {
                        changeTransparency(newValue);
                    }}
            />
        </ConditionTemplate>
    );
};

export default Transparency;
