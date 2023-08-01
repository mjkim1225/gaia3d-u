import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useResponsive from '../../hooks/useResponsive';
import NavContents from "../NavContents";
import { Box, Drawer } from '@mui/material';


const NAV_WIDTH = 350;

Nav.propTypes = {
    openNav: PropTypes.bool,
    onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {

    const isDesktop = useResponsive('up', 'lg', true);

    useEffect(() => {
        if (openNav) {
            onCloseNav();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openNav]);
    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV_WIDTH },
            }}
        >
            {
                isDesktop ? (
                        <Drawer
                            open
                            variant="permanent"
                            PaperProps={{
                                sx: {
                                    width: NAV_WIDTH,
                                    bgcolor: 'background.default',
                                    borderRightStyle: 'dashed',
                                },
                            }}
                        >
                            <NavContents />
                        </Drawer>
                    ) : (
                        <Drawer
                            open={openNav}
                            onClose={onCloseNav}
                            ModalProps={{
                                keepMounted: true,
                            }}
                            PaperProps={{
                                sx: { width: NAV_WIDTH },
                            }}
                        >
                            <NavContents />
                        </Drawer>
                    )
            }
        </Box>
    );
}
