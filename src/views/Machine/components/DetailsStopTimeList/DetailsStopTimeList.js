import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";

const styles = (theme) => ({
    root: {
        margin: 1,
        padding: theme.spacing(1),

    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
});

// const useStyles = makeStyles({
//     root: {
//         minWidth: 275,
//     },
//     bullet: {
//         display: 'inline-block',
//         margin: '0 2px',
//         transform: 'scale(0.8)',
//     },
//     title: {
//         fontSize: 12,
//     },
//     text: {
//         fontSize: 16,
//     },
// });

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6" style={{fontSize:16}}>{children}</Typography>
            {/*{onClose ? (*/}
            {/*    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>*/}
            {/*        <CloseIcon />*/}
            {/*    </IconButton>*/}
            {/*) : null}*/}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function DetailsStopTimeList(props) {
    const {open, handleClose} = props;
    // const [fullWidth, setFullWidth] = React.useState(true);
    // const [maxWidth, setMaxWidth] = React.useState('sm');
    const fullWidth = true;
    const maxWidth = 'sm';
    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <div>
            {/*<Button variant="outlined" color="primary" onClick={handleClickOpen}>*/}
            {/*    Open dialog*/}
            {/*</Button>*/}
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Простоев 2шт. за 30 янв 2020г.
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom color="textSecondary" variant="body2">
                       Службы
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        Электроники
                    </Typography>
                    <Typography gutterBottom variant="body2" color="textSecondary">
                        Время, с 21-00 до 22-00
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        1 час
                    </Typography>
                    <Typography gutterBottom variant="body2" color="textSecondary" >
                        Описание
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        Проверка счетчика метража
                    </Typography>

                    {/*<Typography gutterBottom>*/}
                    {/*    1 час с 11-00 до 12-00*/}
                    {/*</Typography>*/}
                    {/*<Typography gutterBottom>*/}
                    {/*    Механики*/}
                    {/*</Typography>*/}
                    {/*<Typography variant="subtitle2" gutterBottom >*/}
                    {/*    Ремонт редуктора*/}
                    {/*</Typography>*/}

                    {/*<Typography gutterBottom>*/}
                    {/*    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel*/}
                    {/*    scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus*/}
                    {/*    auctor fringilla.*/}
                    {/*</Typography>*/}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

DetailsStopTimeList.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func
};
