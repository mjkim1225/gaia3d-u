import React, {useEffect, useState} from 'react';
import {Stack} from "@mui/material";

import Typography from '@mui/material/Typography';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
//icon
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";
import map from "../../../../map";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const LineCatalog = ({data}) => {

    const [subMenu, setSubMenu] = useState(false);

    const [show, setShow] = useState(false);

    const [subLegend, setSubLegend] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            data.dataList.map(async (d) => {
                await map.addGeoJsonData(d.nameEng, d.url, d.color);
            });
            setShow(true);
        };

        loadData();
    }, []);

    const zoom = () => {
        console.log("zoom")
    }

    const showData = async () => {
        setShow(!show);
        data.dataList.map(async (d) => {
            map.toggleGeoJsonData(d.nameEng);
        });
    }

    const LegendColor = styled('div')(({color}) => ({
        backgroundColor: color,
        width: "20px",
        height: "20px",
        marginRight: "10px"
    }));

    return (
        <>
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
            {
                subMenu ?
                    <Stack direction="column" spacing={1} >
                        <Box sx={{ '& button': { m: 1 } }}>
                            <div>
                                <Button size="small" variant="contained" onClick={zoom} sx={{ width: '30%' }}>
                                    카메라
                                </Button>
                                <Button size="small" variant="outlined" disabled sx={{ width: '30%' }}>
                                    데아터정보
                                </Button>
                                <Button size="small" variant="contained" href="#outlined-buttons" sx={{ width: '10%' }}>
                                    <DeleteForeverIcon />
                                </Button>
                            </div>
                            <div>
                                <Button variant="outlined" size="small" sx={{ width: '90%' }}>
                                    오픈데이터 얻기
                                </Button>
                            </div>
                                <Stack direction="row" alignItems="center" sx={{pl: 1}}>

                                    <Typography noWrap> 범례 </Typography>

                                    <IconButton variant="plain" onClick={() => setSubLegend(!subLegend)}
                                                sx={{
                                                    position: 'absolute',
                                                    right: "5%",
                                                }}
                                    >
                                        {subLegend ? <KeyboardArrowDownIcon/> : <KeyboardArrowLeftIcon/>}
                                    </IconButton>
                                </Stack>
                                {
                                    subLegend ?
                                    <List sx={{p: 1}}>
                                        {
                                            data.dataList.map(d => {
                                                return (
                                                    <ListItem key={d.id} dense={true}>
                                                        <LegendColor color={d.color}/>
                                                        <ListItemText
                                                            primary={d.nameKor}
                                                        />
                                                    </ListItem>
                                                )
                                            })
                                        }
                                    </List>
                                    : null
                                }
                        </Box>
                    </Stack>
                    : null
            }
        </>
    );
}

LineCatalog.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nameKor: PropTypes.string.isRequired,
        nameEng: PropTypes.string.isRequired,
        cityKor: PropTypes.string.isRequired,
        cityEng: PropTypes.string.isRequired,
        dataList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                nameEng: PropTypes.string.isRequired,
                nameKor: PropTypes.string.isRequired,
                color: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
            })).isRequired,
    })
};

export default LineCatalog;
