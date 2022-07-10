import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Appbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                {/* <IconButton edge="start">
                    <Menu color="secondary" />
                </IconButton> */}
                <Typography variant="h6">
                    PDF Quiz
                </Typography>
            </Toolbar>
      </AppBar>
    );
};

export default Appbar;