import React, { useState,useEffect } from 'react';
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
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import wholeDataList from '../../../../data/data';
import useCatalogListStore from "../../../../store/useCatalogListStore";
import { UsageCatalogType } from "../../../../types";

const CatalogSearch = ({ open, close, addNewData }) => {

    const {catalogIdList, addCatalogId} = useCatalogListStore();

    const [dataList, setDataList] = useState<UsageCatalogType[]>([]);

    useEffect(() => {
        const _dataList = wholeDataList.map(data => ({ ...data, usage: false }));
        setDataList(_dataList);
    }, []);

    useEffect(() => {
        const dLength = dataList.length;
        if(dLength > 0 ) {
            const _dataList = dataList.map(data => {
                if(catalogIdList.indexOf(data.id) > -1) {
                    data.usage = true;
                }else {
                    data.usage = false;
                }
                return data;
            })
            setDataList(_dataList);
        }
    }, [catalogIdList])

    const addData = (data) => {
        addNewData(data);
        addCatalogId(data.id);
        close();
    };

    const [selectedData, setSelectedData] = useState<UsageCatalogType>(wholeDataList[0]);

    const showDescription = (data) => {
        setSelectedData(data);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={close}
                maxWidth="sm"
                fullWidth
                sx={{ "& .MuiDialog-paper": { width: 600 }, "& .MuiDialogContent-root": { maxHeight: 500 } }} // 스타일 설정
                BackdropProps={{ invisible: true }}
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> {/* 수정 */}
                    Search Catalog
                    <IconButton edge="end" color="inherit" onClick={close} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ display: 'flex' }}>
                    <List style={{ maxHeight: 300, overflow: 'auto', flex: 1, borderRight:'1px solid rgba(0, 0, 0, 0.12)' }} >
                        {
                            dataList.map((data: UsageCatalogType, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    onClick={() => showDescription(data)}
                                >
                                    <ListItemText primary={data?.nameKor} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="add"
                                            disabled={data?.usage}
                                            onClick={() => addData(data)}>
                                            <AddIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        }
                    </List>
                    <div style={{ flex: 1, padding: '20px' }}>
                        {selectedData ? (
                            <div>
                                <Typography gutterBottom variant="h5" component="div">
                                    {selectedData.nameKor}
                                </Typography>
                                {
                                    selectedData?.usage ? (
                                        <Button variant="contained"
                                                disabled={true}
                                                onClick={() => addData(selectedData)}
                                        >
                                            ALREADY ADDED
                                        </Button>
                                    ):(
                                        <Button variant="contained"
                                                startIcon={ <AddIcon />}
                                                onClick={() => addData(selectedData)}
                                        >
                                            ADD CATALOG
                                        </Button>
                                    )
                                }

                                <Typography variant="body2" color="text.secondary">
                                    {selectedData.nameKor}
                                </Typography>
                            </div>
                        ) : (
                            <div style={{ color: 'gray' }}>목록을 선택해주세요.</div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CatalogSearch;
