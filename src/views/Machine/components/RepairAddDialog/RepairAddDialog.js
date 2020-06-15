import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import PropTypes from "prop-types";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    multilineTextFields: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '100%',

        },
        marginRight: theme.spacing(4),
        marginBottom: theme.spacing(3),
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    switches:{
        margin: theme.spacing(1),
    },

    marginBottom:{
        marginBottom: theme.spacing(3),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    resetContainer: {
        padding: theme.spacing(2),
    },
}));

function getSteps() {
    return ['Оборудование', 'Службы', 'Описание'];
}

function SwitchesGroup() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        tech: false,
        energo: false,
        electro: false,
        mech: false
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <FormControl component="fieldset">
            {/*<FormLabel component="legend">Assign responsibility</FormLabel>*/}
            <FormGroup className={classes.marginBottom}>
                <FormControlLabel
                    control={<Switch checked={state.tech} onChange={handleChange} name="tech" />}
                    label="Технологи"
                    className={classes.switches}
                />
                <FormControlLabel
                    control={<Switch checked={state.energo} onChange={handleChange} name="energo" />}
                    label="Энергетики"
                    className={classes.switches}
                />
                <FormControlLabel
                    control={<Switch checked={state.mech} onChange={handleChange} name="mech" />}
                    label="Механики"
                    className={classes.switches}
                />
                <FormControlLabel
                    control={<Switch checked={state.electro} onChange={handleChange} name="electro" />}
                    label="Электроники"
                    className={classes.switches}
                />
            </FormGroup>
            {/*<FormHelperText>Be careful</FormHelperText>*/}
        </FormControl>
    );
}

function MultilineTextFields() {
    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <form className={classes.multilineTextFields} noValidate autoComplete="off">
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label=""
                    multiline
                    rows={4}
                    defaultValue=""
                    variant="outlined"
                />
            </div>
        </form>
    );
}

function getStepContent(props) {
    const {step, idMachine, nameMachine } = props;
    switch (step) {
        case 0:
            return (
                <h2>{nameMachine}</h2>
            );
        case 1:
            return (
                <SwitchesGroup/>
            );
        case 2:
            return (
                <MultilineTextFields/>
            );
        default:
            return 'Unknown step';
    }
}

getStepContent.propTypes = {
    step: PropTypes.number,
    idMachine: PropTypes.number,
    nameMachine:PropTypes.string
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RepairAddDialog(props) {
    const classes = useStyles();
    const {openRepairAddDialog, handleClose, idMachine, nameMachine} = props;
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    // const [openRepairAddDialog, setOpenRepairAddDialog] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpenRepairAddDialog(true);
    // };

    // const handleClose = () => {
    //     setOpenRepairAddDialog(false);
    // };

    return (
        <Dialog fullScreen open={openRepairAddDialog} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar style={{color: "white", backgroundColor: "#ff9800"}}>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Вызов персонала
                    </Typography>
                    {/*<Button autoFocus color="inherit" onClick={handleClose}>*/}
                    {/*    Х*/}
                    {/*</Button>*/}
                </Toolbar>
            </AppBar>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent({step: index, idMachine:0, nameMachine:'nameMachine'})}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Назад
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Вызвать' : 'Далее'}
                                    </Button>
                                    </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
                    </Button>
                </Paper>
            )}
            {/*<List>*/}
            {/*    <ListItem button>*/}
            {/*        <ListItemText primary="Phone ringtone" secondary="Titania"/>*/}
            {/*    </ListItem>*/}
            {/*    <Divider/>*/}
            {/*    <ListItem button>*/}
            {/*        <ListItemText primary="Default notification ringtone" secondary="Tethys"/>*/}
            {/*    </ListItem>*/}
            {/*</List>*/}
        </Dialog>
    )
}

RepairAddDialog.propTypes = {
    openRepairAddDialog: PropTypes.bool,
    handleClose: PropTypes.func,
    idMachine: PropTypes.number,
    nameMachine: PropTypes.string
};

