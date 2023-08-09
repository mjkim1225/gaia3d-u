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

import PropTypes from "prop-types";
import map from "../../../../map";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Legend from "./Legend";
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

const LineCatalog = ({ data }) => {

    const [subMenu, setSubMenu] = useState(false);

    const [show, setShow] = useState(true);

    // @ts-ignore
    const [line, setLine] = useState<map.GaiaGeoJsonDataSource | null>(null);

    // 실제 데이터를 remove 하지않고, 컴포넌트만 지운다
    // 이유: 데이터를 실제로 list에서 remove 하면 컴포넌트를 다시생성하는데, 그때 Gaia** 객체들도 다시 생성된다.. 따라서 기능이 제대로 수행이 안됨
    const [isVisible, setIsVisible] = useState(true);

    const [legendList, setLegendList] = useState<{id:number, title:string, color:string}[]>([]);

    useEffect(() => {
        const viewer = map.getViewer();
        const _line = new map.GaiaGeoJsonDataSource(viewer, data.dataList);
        setLine(_line);

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
        setIsVisible(false);
    }

    if (!isVisible) {
        return null; // isVisible이 false일 때는 컴포넌트를 렌더링하지 않음
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
                                        href="#outlined-buttons"
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
