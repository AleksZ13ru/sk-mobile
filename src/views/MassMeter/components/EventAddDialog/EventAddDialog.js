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
// import MachineSelect from "../MachineSelect";
// import ServicesSelect from "../ServicesSelect"
// import ServicesText from "../ServicesText"
// import MultilineTextFields from "../MultilineTextFields"
import ButtonGroupDialog from "../../../../components/ButtonGroupDialog";
import {loader} from "graphql.macro";
import {useMutation} from '@apollo/react-hooks';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from "@material-ui/core/TextField";

const EVENT_ADD = loader('../../Graphql/EVENT_ADD.graphql');

const useStyles = makeStyles(theme => ({
    rootProgress: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    rootTextField: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            // width: 200,
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

export default function EventAddDialog(props) {
    const classes = useStyles();
    const {openCrashDialogAdd, handleClose, idMachine, nameMachine} = props;
    const initMachine = {
        idMachine: idMachine,
        nameMachine: nameMachine,
    };
    const initObj = '';
    const initMassObject = null;
    const initMassIndicator = null;
    const [machine, setMachine] = React.useState(initMachine);
    const [obj, setObj] = React.useState(initObj);
    const [massObject, setMassObject] = React.useState(initMassObject);
    const [massIndication, setMassIndication] = React.useState(initMassIndicator);

    function onCompleted() {
        setMachine(initMachine);
        // setText([]);
        setObj(initObj);
        setMassObject(initMassObject);
        setMassIndication(initMassIndicator);
        setActiveStep(1);
        handleClose();
    }

    const [eventAdd,
        {loading: mutationLoading, error: mutationError},

    ] = useMutation(EVENT_ADD, {onCompleted});

    const [activeStep, setActiveStep] = React.useState(1);

    // const [steps, setSteps] = React.useState({
    //     step1: 'Оборудование: ',
    //     step2: 'Службы: ',
    //     step3: 'Описание неисправности: ',
    //     step4: 'Проверка и отправка'
    // });

    const steps = {
        step1: 'Весы: ',
        step2: 'Предмет взвешивания: ',
        step3: 'Показания весов: ',
        step4: 'Проверка и отправка: '
    };

    // const [text, setText] = React.useState([]);

    // const handleTextChange = (event) => {
    //     setText(event.target.value);
    // };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // console.log(state)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFinish = () => {
        // const array_service = services.array.filter((el) => (el.checked)).map(el => (el.id));
        eventAdd({
            variables: {
                massMeterId:machine.idMachine,
                object: obj,
                massObject: massObject,
                massIndication:massIndication
            }

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
                <Toolbar style={{color: "white", backgroundColor: "#d500f9"}}>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Взвешивание груза
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
                        {/*<MachineSelect nameMachine={machine.nameMachine}/>*/}
                        {/*</Typography>*/}
                        <ButtonGroupDialog
                            disabledBack={true}
                            handleNext={handleNext}
                        />
                    </StepContent>
                </Step>
                <Step key='step2'>
                    <StepLabel>{steps.step2} <b>{obj} {+massObject>0 && massObject} {+massObject>0 && 'кг.'}</b></StepLabel>
                    <StepContent>
                        {/*<Typography>*/}
                        <div className={classes.rootTextField}>
                            <TextField id="obj" label="Наименование" variant="outlined" value={obj}
                                       onChange={(event) => setObj(event.target.value)}/>
                            <TextField id="mass-object" label="Указанный вес" variant="outlined" value={massObject} type="number"
                                       onChange={(event) => setMassObject(event.target.value)}/>
                        </div>

                        {/*</Typography>*/}
                        <ButtonGroupDialog
                            disableNext={obj.length === 0}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </StepContent>
                </Step>
                <Step key='step3'>
                    <StepLabel>{steps.step3} <b>{+massIndication>0 && massIndication} {+massIndication>0 && 'кг.'}</b></StepLabel>
                    <StepContent>
                        {/*<Typography>*/}
                        <TextField id="mass-indication" label="Измеренный вес" variant="outlined" value={massIndication } type="number"
                                   onChange={(event) => setMassIndication(event.target.value)}/>
                        {/*</Typography>*/}
                        <ButtonGroupDialog
                            disableNext={!+massIndication > 0}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </StepContent>
                </Step>
                <Step key='step4'>
                    <StepLabel>{steps.step4}</StepLabel>
                    <StepContent>

                        <Typography>
                            {
                                +massObject>0 && `Погрешность измерения: ${Math.abs(100-massIndication/massObject*100).toFixed(1)} %`

                            }
                        </Typography>

                        {mutationLoading &&
                        <div className={classes.rootProgress}>
                            <LinearProgress/>
                        </div>}
                        {mutationError && <p><b>Не удалось отправить результат взвешивания</b></p>}

                        <ButtonGroupDialog
                            handleBack={handleBack}
                            handleNext={handleFinish}
                            nextStepText='Оправить результат'
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

EventAddDialog.propTypes = {
    openCrashDialogAdd: PropTypes.bool,
    handleClose: PropTypes.func,
    idMachine: PropTypes.string,
    nameMachine: PropTypes.string
};

