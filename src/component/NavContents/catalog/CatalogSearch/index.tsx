import React, {useEffect, useState} from 'react';
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
import railways from '../../../../data/railways';

const wholeDataList = [...buildings, ...railways]; //TODO 나중에 모든 데이터를 가져오는 모듈을 만들어서 따로 빼자

const CatalogSearch = ({ open, close, addNewData }) => {
    const addData = (data) => {
        addNewData(data);
        close();
        dataList.find(item => item.id === data.id && item.type === data.type).usage = true;
    };

    const [dataList, setDataList] = useState<any[]>([]);

    useEffect(() => {
        const _dataList = wholeDataList.map(data => ({ ...data, usage: false }));
        setDataList(_dataList);
    }, []);

    return (
        <div>
            <Dialog
                open={open}
                onClose={close}
                maxWidth="sm"
                fullWidth
                sx={{ "& .MuiDialog-paper": { width: 400 }, "& .MuiDialogContent-root": { maxHeight: 500 } }} // 스타일 설정
                BackdropProps={{ invisible: true }}
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> {/* 수정 */}
                    Search Catalog
                    <IconButton edge="end" color="inherit" onClick={close} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <List style={{ maxHeight: 300, overflow: 'auto' }}>
                        {
                            dataList.map((data, index) =>
                                 (
                                    <ListItem key={index}>
                                        <ListItemText primary={data.nameKor} />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                aria-label="add"
                                                disabled={data.usage}
                                                onClick={() => addData(data)}>
                                                <AddIcon />
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
