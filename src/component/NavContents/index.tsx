import * as React from 'react';
import PropTypes from 'prop-types';
import {useState} from "react";

import {styled, alpha} from '@mui/material/styles';
import {Box, Link, Button } from '@mui/material';

import Contact from "./Contact";
import Help from "./Help";
import Settings from "./Settings";
import Catalog from "./Catalog";

// Icons import
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';


const buttons = [
    {
        icon: 'StorageRoundedIcon',
    },
    {
        icon: 'TuneRoundedIcon',
    },
    {
        icon: 'HelpOutlineRoundedIcon',
    },
    {
        icon: 'MessageRoundedIcon',
    },
];

const StyledAccount = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const NavContents = () => {

    const [select, setSelect] = useState<string>(buttons[0].icon);

    const handleClick = (icon: string) => {
        setSelect(icon);
    };

    return (
        <div>
            <Box sx={{px: 2.5, py: 3, display: 'inline-flex'}}>
            </Box>

            <Box sx={{mb: 1, mx: 2.5}}>
                <Link underline="none">
                    <StyledAccount>
                        <Box>
                            {
                                buttons.map((btn) =>
                                     (
                                        <Button key={btn.icon} onClick={() => handleClick(btn.icon)}
                                                variant={`${select === btn.icon ? 'contained' : 'outlined'}`}>
                                            {
                                                btn.icon === 'StorageRoundedIcon' ? <StorageRoundedIcon/> :
                                                    btn.icon === 'TuneRoundedIcon' ? <TuneRoundedIcon/> :
                                                        btn.icon === 'HelpOutlineRoundedIcon' ?
                                                            <HelpOutlineRoundedIcon/> :
                                                            btn.icon === 'MessageRoundedIcon' ?
                                                                <MessageRoundedIcon/> : null
                                            }
                                        </Button>
                                    )
                                )
                            }
                        </Box>
                    </StyledAccount>
                </Link>
            </Box>


            <Box sx={{flexGrow: 1}}/>

            <Box sx={{px: 0.5}}>
                {
                    select === 'StorageRoundedIcon' ? <Catalog></Catalog> :
                    select === 'TuneRoundedIcon' ? <Settings></Settings> :
                    select === 'HelpOutlineRoundedIcon' ? <Help></Help> :
                    select === 'MessageRoundedIcon' ? <Contact></Contact> : null
                }

            </Box>
        </div>
    );
}

export default NavContents;
