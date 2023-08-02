import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';

import buildings from '../../../../data/buildings';
import railways from "../../../../data/railways";

const CatalogSearch = ({open, close, addNewData}) => {

    const addData = (data) => {
        addNewData(data);
        close();
    }

    return (
        <div>
            <Dialog open={open}
                    onClose={close}
                    maxWidth="sm"
                    fullWidth
                    BackdropProps={{invisible: true}}
            >
                <DialogTitle>
                    Search Catalog
                    <IconButton edge="end" color="inherit" onClick={close} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <List>
                        {
                            buildings.map((building, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={building.nameKor}/>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="add" onClick={()=>addData(building)}>
                                            <AddIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        }
                        {
                            railways.map((railway, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={railway.nameKor}/>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="add" onClick={()=>addData(railway)}>
                                            <AddIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        }
                    </List>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CatalogSearch;
