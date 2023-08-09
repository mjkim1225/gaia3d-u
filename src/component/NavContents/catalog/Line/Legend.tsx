import React, { useState } from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import ConditionTemplate from '../common/ConditionTemplate';

const LegendColor = styled('div')(({ color }) => ({
    backgroundColor: color,
    width: "20px",
    height: "20px",
    marginRight: "10px"
}));

const Legend = ({ dataList }) => {
    const [open, setOpen] = useState(true);

    const toggleContent = () => {
        setOpen(!open);
    };

    return (
        <ConditionTemplate title="범례" open={open} toggleContent={toggleContent}>
            <List sx={{ p: 1 }}>
                {dataList.map(d => (
                    <ListItem key={d.id} dense={true}>
                        <LegendColor color={d.color} />
                        <ListItemText primary={d.title} />
                    </ListItem>
                ))}
            </List>
        </ConditionTemplate>
    );
};

export default Legend;

Legend.propTypes = {
    dataList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
    })).isRequired
};
