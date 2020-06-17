import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
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
import MachineSelect from "../MachineSelect";
import ServicesSelect from "../ServicesSelect"
import ServicesText from "../ServicesText"
import MultilineTextFields from "../MultilineTextFields"
import ButtonGroupDialog from "../ButtonGroupDialog";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RepairAddDialog(props) {
    const classes = useStyles();
    const {openRepairAddDialog, handleClose, idMachine, nameMachine} = props;
    const [activeStep, setActiveStep] = React.useState(1);

    const [steps, setSteps] = React.useState({
        step1: 'Оборудование: ',
        step2: 'Службы: ',
        step3: 'Описание неисправности: ',
        step4: 'Проверка и отправка'
    });

    const initServices = {
        array: [
            {
                key: 'tech',
                name: 'Технологи',
                checked: false
            }, {
                key: 'energo',
                name: 'Электрики',
                checked: false
            }, {
                key: 'mech',
                name: 'Механики',
                checked: false
            }, {
                key: 'electro',
                name: 'Электроники',
                checked: false
            }
        ]
    };
    const initMachine = {
        idMachine: idMachine,
        nameMachine: nameMachine,
    };

    const [machine, setMachine]  = React.useState(initMachine);
    const [services, setServices] = React.useState(initServices);
    const [text, setText] = React.useState([]);

    const handleServiceSelect = (event) => {
        // console.log(event.target.checked);
        // console.log(event.target.name);
        setServices(prevState => ({
            ...services, array: services.array.map(
                el => el.key === event.target.name ? {...el, checked: event.target.checked} : el
            )
        }));
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // console.log(state)
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
                    <StepLabel>{steps.step1} <b>{machine.nameMachine}</b></StepLabel>
                    <StepContent>
                        {/*<Typography> */}
                            <MachineSelect nameMachine={machine.nameMachine}/>
                        {/*</Typography>*/}
                        <ButtonGroupDialog
                            disabledBack={true}
                            handleNext={handleNext}
                        />
                    </StepContent>
                </Step>
                <Step key='step2'>
                    <StepLabel>{steps.step2} <ServicesText services={services.array}/></StepLabel>
                    <StepContent>
                        {/*<Typography>*/}
                            <ServicesSelect services={services.array}
                                                    handleChange={handleServiceSelect}/>
                        {/*</Typography>*/}
                        <ButtonGroupDialog
                            disableNext={services.array.filter((el) => (el.checked)).length === 0}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </StepContent>
                </Step>
                <Step key='step3'>
                    <StepLabel>{steps.step3} <b>{text}</b></StepLabel>
                    <StepContent>
                        {/*<Typography>*/}
                            <MultilineTextFields text={text}
                                                         handleChange={handleTextChange}/>
                        {/*</Typography>*/}
                        <ButtonGroupDialog
                            disableNext={text.length === 0}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </StepContent>
                </Step>
                <Step key='step4'>
                    <StepLabel>{steps.step4}</StepLabel>
                    <StepContent>
                        {/*<Typography></Typography>*/}
                        <ButtonGroupDialog
                            handleBack={handleBack}
                            handleNext={handleNext}
                            finishStepText='Отправить заявку'
                        />
                    </StepContent>
                </Step>
            </Stepper>
            {/*{activeStep === steps.length && (*/}
            {/*    <Paper square elevation={0} className={classes.resetContainer}>*/}
            {/*        <Typography>All steps completed - you&apos;re finished</Typography>*/}
            {/*        <Button onClick={handleReset} className={classes.button}>*/}
            {/*            Reset*/}
            {/*        </Button>*/}
            {/*    </Paper>*/}
            {/*)}*/}
        </Dialog>
    )
}

RepairAddDialog.propTypes = {
    openRepairAddDialog: PropTypes.bool,
    handleClose: PropTypes.func,
    idMachine: PropTypes.string,
    nameMachine: PropTypes.string
};

