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
import {loader} from "graphql.macro";
import {useMutation} from '@apollo/react-hooks';
import LinearProgress from '@material-ui/core/LinearProgress';

const CRASH_ADD = loader('../../Graphql/CRASH_ADD.graphql');

const useStyles = makeStyles(theme => ({
    rootProgress: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
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

export default function CrashDialogAdd(props) {
    const classes = useStyles();
    const {openCrashDialogAdd, handleClose, idMachine, nameMachine} = props;

    function onCompleted() {
        setMachine(initMachine);
        setServices(initServices);
        setText([]);
        setActiveStep(1);
        handleClose();
    }

    const [crashAdd,
        {loading: mutationLoading, error: mutationError},

    ] = useMutation(CRASH_ADD, {onCompleted});
    const [activeStep, setActiveStep] = React.useState(1);

    // const [steps, setSteps] = React.useState({
    //     step1: 'Оборудование: ',
    //     step2: 'Службы: ',
    //     step3: 'Описание неисправности: ',
    //     step4: 'Проверка и отправка'
    // });

    const steps = {
        step1: 'Оборудование: ',
        step2: 'Службы: ',
        step3: 'Описание неисправности: ',
        step4: 'Проверка и отправка: '
    };

    const initServices = {
        array: [
            {
                id: 4,
                key: 'tech',
                name: 'Технологи',
                checked: false
            }, {
                id: 3,
                key: 'energo',
                name: 'Электрики',
                checked: false
            }, {
                id: 2,
                key: 'mech',
                name: 'Механики',
                checked: false
            }, {
                id: 1,
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

    const [machine, setMachine] = React.useState(initMachine);
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

    const handleFinish = () => {
        const array_service = services.array.filter((el) => (el.checked)).map(el => (el.id));
        crashAdd({
            variables: {
                machineId: idMachine,
                // dtStart: "2020-05-29T00:00:00Z",
                servicesID: array_service,
                text: text
            },

        }).then(r => {});
    };

    // const [openRepairAddDialog, setOpenRepairAddDialog] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpenRepairAddDialog(true);
    // };

    // const handleClose = () => {
    //     setOpenRepairAddDialog(false);
    // };

    return (
        <Dialog fullScreen open={openCrashDialogAdd} onClose={handleClose} TransitionComponent={Transition}>
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
                        {mutationLoading &&
                        <div className={classes.rootProgress}>
                            <LinearProgress/>
                        </div>}
                        {mutationError && <p><b>Не удалось отправить заявку</b></p>}
                        <ButtonGroupDialog
                            handleBack={handleBack}
                            handleNext={handleFinish}
                            nextStepText='Вызвать персонал'
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

CrashDialogAdd.propTypes = {
    openCrashDialogAdd: PropTypes.bool,
    handleClose: PropTypes.func,
    idMachine: PropTypes.string,
    nameMachine: PropTypes.string
};

