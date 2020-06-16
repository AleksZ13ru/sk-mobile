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
    switches: {
        margin: theme.spacing(1),
    },

    marginBottom: {
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

function Machine(props) {
    const {nameMachine} = props;

    return (
        <div>
            <h2>{nameMachine}</h2>
        </div>

    )
}

Machine.propTypes = {
    nameMachine: PropTypes.string
};

function ServicesSelect(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        tech: false,
        energo: false,
        electro: false,
        mech: false
    });

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    return (
        <FormControl component="fieldset">
            {/*<FormLabel component="legend">Assign responsibility</FormLabel>*/}
            <FormGroup className={classes.marginBottom}>
                <FormControlLabel
                    control={<Switch checked={state.tech} onChange={handleChange} name="tech"/>}
                    label="Технологи"
                    className={classes.switches}
                />
                <FormControlLabel
                    control={<Switch checked={state.energo} onChange={handleChange} name="energo"/>}
                    label="Энергетики"
                    className={classes.switches}
                />
                <FormControlLabel
                    control={<Switch checked={state.mech} onChange={handleChange} name="mech"/>}
                    label="Механики"
                    className={classes.switches}
                />
                <FormControlLabel
                    control={<Switch checked={state.electro} onChange={handleChange} name="electro"/>}
                    label="Электроники"
                    className={classes.switches}
                />
            </FormGroup>
            {/*<FormHelperText>Be careful</FormHelperText>*/}
        </FormControl>
    );
}

ServicesSelect.propTypes = {
    nameMachine: PropTypes.string

};

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

// function getStepContent(props) {
//     const {step, idMachine, nameMachine } = props;
//     switch (step) {
//         case 0:
//             return (
//                 <Machine nameMachine={nameMachine}/>
//             );
//         case 1:
//             return (
//                 <ServicesSelect/>
//             );
//         case 2:
//             return (
//                 <MultilineTextFields/>
//             );
//         default:
//             return 'Unknown step';
//     }
// }
//
// getStepContent.propTypes = {
//     step: PropTypes.number,
//     idMachine: PropTypes.number,
//     nameMachine:PropTypes.string
// };

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RepairAddDialog(props) {
    const classes = useStyles();
    const {openRepairAddDialog, handleClose, idMachine, nameMachine} = props;
    const [activeStep, setActiveStep] = React.useState(0);
    // const steps = getSteps();
    // const steps = ['Оборудование:', 'Службы:', 'Описание:'];
    const [steps, setSteps] = React.useState({
        step1: 'Оборудование: ',
        step2: 'Службы: ',
        step3: 'Описание: '
    });

    const [serviceSelect, setServiceSelect] = React.useState(['nt[', 'rte']);
    const initState = {
        nameMachine: {nameMachine},
        services: [
            {
                key: 'tech',
                name: 'Технологи',
                checked: false
            }, {
                key: 'mech',
                name: 'Механики',
                checked: false
            }
        ],
        text: ''
    };
    const [state, setState] = React.useState(initState);
    let key = 2;

    const handleChange = (event) => {
        console.log(state);
        setState(prevState => ({
            ...state, services: prevState.services.map(
                el => el.key === [event.target.key] ? {...el, checked : event.target.checked} : el
            )

        }));
        console.log(state)
        // setState({...state, [event.target.name]: event.target.checked});
        // setState(prevState => ({
        //     ...state, services: state.services.map(
        //         (service, index) => (
        //             service.index === 1 ? {...service, checked: true} : service
        //         )
        //     )
        // }))
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log(state);
        setState(prevState => ({
            ...state, nameMachine: '2346'

        }));
        // setState(prevState => ({
        //     ...state, todoItems: prevState.todoItems.map(
        //         el => el.name === 'Learn React Basics' ? {...el, status: 'done'} : el
        //     ),
        //     // ...state, nameMachine: '234'
        //
        // }));
        console.log(state)


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
                        <CloseIcon/>
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
                <Step key='step1'>
                    <StepLabel>{steps.step1}{state.nameMachine}</StepLabel>
                    <StepContent>
                        <Typography> <Machine nameMachine={nameMachine}/> </Typography>
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
                <Step key='step2'>
                    <StepLabel>{steps.step2} <b>{serviceSelect} </b></StepLabel>
                    <StepContent>
                        <Typography><ServicesSelect/></Typography>
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
                <Step key='step3'>
                    <StepLabel>{steps.step3}</StepLabel>
                    <StepContent>
                        {/*<Typography>{getStepContent({step: 2, idMachine:0, nameMachine:'nameMachine'})}</Typography>*/}
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
                {/*{steps.map((step, index) => (*/}
                {/*    <Step key={label}>*/}
                {/*        <StepLabel>{label}</StepLabel>*/}
                {/*        <StepContent>*/}
                {/*            <Typography>{getStepContent({step: index, idMachine:0, nameMachine:'nameMachine'})}</Typography>*/}
                {/*            <div className={classes.actionsContainer}>*/}
                {/*                <div>*/}
                {/*                    <Button*/}
                {/*                        disabled={activeStep === 0}*/}
                {/*                        onClick={handleBack}*/}
                {/*                        className={classes.button}*/}
                {/*                    >*/}
                {/*                        Назад*/}
                {/*                    </Button>*/}
                {/*                    <Button*/}
                {/*                        variant="contained"*/}
                {/*                        color="primary"*/}
                {/*                        onClick={handleNext}*/}
                {/*                        className={classes.button}*/}
                {/*                    >*/}
                {/*                        {activeStep === steps.length - 1 ? 'Вызвать' : 'Далее'}*/}
                {/*                    </Button>*/}
                {/*                    </div>*/}
                {/*            </div>*/}
                {/*        </StepContent>*/}
                {/*    </Step>*/}
                {/*))}*/}
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
    idMachine: PropTypes.string,
    nameMachine: PropTypes.string
};

