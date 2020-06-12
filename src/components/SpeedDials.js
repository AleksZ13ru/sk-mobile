import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
// import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
// import SaveIcon from '@material-ui/icons/Save';
// import PrintIcon from '@material-ui/icons/Print';
// import ShareIcon from '@material-ui/icons/Share';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import BuildIcon from '@material-ui/icons/Build';

import FlagIcon from '@material-ui/icons/Flag';
import {Link} from "react-router-dom";
// import ListItem from "@material-ui/core/ListItem";

// import green from '@material-ui/core/colors/green';
// import orange from '@material-ui/core/colors/orange';
// import blue from '@material-ui/core/colors/blue';


const useStyles = makeStyles((theme) => ({
    root: {
        // transform: 'translateZ(0px)',
        // flexGrow: 1,
    },
    exampleWrapper: {
        // position: 'relative',
        // margin: theme.spacing(6),
        // height: 180,

        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    speedDialAction: {
        margin: theme.spacing(3),
    },

    // radioGroup: {
    //     margin: theme.spacing(2, 1),
    // }

}));

const actions = [
    { icon: <FlagIcon  style={{color:"#4caf50"}} />, name: 'Завершить ремонт' },
    { icon: <LibraryBooksIcon style={{color:"#2196f3"}} />, name: 'Добавить заметку' },
    { icon: <BuildIcon style={{color:"#ff9800"}}/>, name: 'Вызвать персонал' },
    // { icon: <ShareIcon />, name: 'Share' },
    // { icon: <FavoriteIcon />, name: 'Like' },
];

export default function SpeedDials() {
    const classes = useStyles();
    // const [direction, setDirection] = React.useState('up');
    const [open, setOpen] = React.useState(false);
    // const [hidden, setHidden] = React.useState(false);

    // const handleDirectionChange = (event) => {
    //     setDirection(event.target.value);
    // };

    // const handleHiddenChange = (event) => {
    //     setHidden(event.target.checked);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className={classes.root}>
            <div className={classes.exampleWrapper}>
                <Backdrop open={open} />
                <SpeedDial
                    ariaLabel="SpeedDial example"
                    // className={classes.speedDial}
                    // hidden={hidden}
                    icon={<SpeedDialIcon/>}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    direction={'up'}

                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            className={classes.speedDialAction}
                            title={action.name}
                            key={action.name}
                            icon={action.icon }
                            tooltipTitle={action.name}
                            tooltipOpen
                            onClick={handleClose}
                            component={Link}
                            to={`/repair_add`}
                        />
                    ))}
                </SpeedDial>
            </div>
        </div>
    );
}
