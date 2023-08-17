// Clipping.js
import React, { useEffect, useState } from 'react';
import Switch from "@mui/joy/Switch";
import {Typography} from "@mui/material";
import ConditionTemplate from "../common/ConditionTemplate";

const Clipping = ({ tileset }) => {
    const [open, setOpen] = useState(true);
    const [clipping, setClipping] = React.useState<boolean>(false);

    const toggleContent = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if (clipping) tileset.createClippingPlanes();
    }, [clipping]);

    return (
        <ConditionTemplate title="클리핑" open={open} toggleContent={toggleContent}>
            <Typography variant="body1"> 활성화 </Typography>
            <Switch checked={clipping} onChange={(event) => setClipping(event.target.checked)} />
        </ConditionTemplate>
    );
};

export default Clipping;
