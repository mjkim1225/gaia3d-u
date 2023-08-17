import React, {useEffect, useState} from 'react';
import {Stack} from "@mui/material";

import Typography from '@mui/material/Typography';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

//icon
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import map from "../../../../map";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Legend from "../common/Legend";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#F5F5F5',
    ...theme.typography.body2,
    padding: "1px",
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
}));

const LineCatalog = ({ data, line, removeCatalogId }) => {

    const [subMenu, setSubMenu] = useState(false);

    const [show, setShow] = useState(true);

    const [legendList, setLegendList] = useState<{id:number, title:string, color:string}[]>([]);

    useEffect(() => {
        data.dataList.map((item, index) => {
            setLegendList(prevState => [...prevState, {id:index, title:item.nameKor, color:item.color}]);
        });

        zoom();
    }, []);

    const zoom = () => {
        map.setCameraView(data.cameraOption);
    }

    const showData = async () => {
        setShow(!show);
        line.toggle();
    }

    const remove = () => {
        line.remove();
        removeCatalogId();
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>
                <Item sx={{ my: 1, mx: 'auto', p: 1 }}>
                    <Stack direction="row" alignItems="center" sx={{p: 1}}>
                        <IconButton variant="plain">
                            <DragIndicatorIcon/>
                        </IconButton>
                        <IconButton variant="plain" onClick={showData}>
                            {show ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                        </IconButton>

                        <Typography noWrap> {data.nameKor} </Typography>

                        <IconButton variant="plain" onClick={() => setSubMenu(!subMenu)}
                                    sx={{
                                        position: 'absolute',
                                        right: "5%",
                                    }}
                        >
                            {subMenu ? <KeyboardArrowDownIcon/> : <KeyboardArrowLeftIcon/>}
                        </IconButton>
                    </Stack>
                    <Stack direction="column" spacing={1} sx={{ display: subMenu? 'block' : 'none'}}>
                        <Box sx={{ '& button': { m: 1 } }}>
                            <div>
                                <Button size="small" variant="contained" onClick={zoom} sx={{ width: '30%' }}>
                                    카메라
                                </Button>
                                <Button size="small" variant="outlined" disabled sx={{ width: '30%' }}>
                                    데아터정보
                                </Button>
                                <Button size="small"
                                        sx={{ width: '10%' }}
                                        variant="contained"
                                        onClick={remove} >
                                    <DeleteForeverIcon />
                                </Button>
                            </div>
                            <Legend dataList={legendList} />
                        </Box>
                    </Stack>
                </Item>
            </Box>
        </>
    );
}

export default LineCatalog;
