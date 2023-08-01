import React,  { useState }  from 'react';

import { styled } from '@mui/material/styles';

import Nav from './component/Nav';
import Map from "./component/Map";
import Header from "./component/Header";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));


export default function App() {
    const [open, setOpen] = useState(false);
    return (
        <StyledRoot>
            {/*<Header onOpenNav={() => setOpen(true)} />*/}
            <Nav openNav={open} onCloseNav={() => setOpen(false)} />
            <Main>
                <Map />
            </Main>
        </StyledRoot>
    );
}
