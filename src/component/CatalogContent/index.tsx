import * as React from 'react';
import {Stack} from "@mui/material";

import Typography from '@mui/material/Typography';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/material/Box';

//icon
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
}));

const CatalogContent = () => {
    return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            <Item
                sx={{
                    my: 1,
                    mx: 'auto',
                    p: 1,
                }}
            >
            <Stack direction="row" alignItems="center" sx={{p:1}}>
                <IconButton variant="plain">
                    <DragIndicatorIcon />
                </IconButton>
                <IconButton variant="plain">
                    <VisibilityIcon />
                </IconButton>

                <Typography noWrap>서울시(건물데이터) </Typography>

                <IconButton variant="plain">
                    <KeyboardArrowDownIcon />
                </IconButton>
            </Stack>
            </Item>
        </Box>
    );
}

export default CatalogContent;
