import React, { useState } from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";

const LegendColor = styled('div')(({color}) => ({
    backgroundColor: color,
    width: "20px",
    height: "20px",
    marginRight: "10px"
}));

const Legend = ({dataList}) => {
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
                <Typography variant="body1" sx={{ textAlign: 'left', pl: '10px'}}> 범례 </Typography>
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
                    <List sx={{p: 1}}>
                        {
                            dataList.map(d => {
                                return (
                                    <ListItem key={d.id} dense={true}>
                                        <LegendColor color={d.color}/>
                                        <ListItemText
                                            primary={d.title}
                                        />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Box>
            )}
        </Box>
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
