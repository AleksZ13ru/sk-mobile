import React from 'react';
// import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {

// padding: theme.spacing(4)
    }
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div
           className={clsx(classes.root)}
        >
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="/">
                    Сарансккабель
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    );
};

export default Footer;
