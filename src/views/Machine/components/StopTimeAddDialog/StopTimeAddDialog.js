import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
import {format} from "date-fns";
import ruLocale from "date-fns/locale/ru";
import MachineSelect from "../MachineSelect";
import ServicesSelect from "../ServicesSelect"
import ServicesText from "../ServicesText"
import MultilineTextFields from "../MultilineTextFields"
import DateTimeSelect from "./components/DateTimeSelect";
import ButtonGroupDialog from "../ButtonGroupDialog"
import {loader} from "graphql.macro";
import {useMutation} from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";
import DateTimeString from "./components/DateTimeString";
import {datePickerDefaultProps} from "@material-ui/pickers/constants/prop-types";
// import Paper from "@material-ui/core/Paper";
// import TextField from "@material-ui/core/TextField";
// import {DatePicker, KeyboardDatePicker} from "@material-ui/pickers";
// import {TimePicker, KeyboardTimePicker} from "@material-ui/pickers";

const ADD_STOP_TIME = loader('../../Graphql/ADD_STOP_TIME.graphql');

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    resetContainer: {
        padding: theme.spacing(2),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DateIsValid(Date) {
    return (Date !== null && !isNaN(Date.getTime()))
}

export default function StopTimeAddDialog(props) {
    const {openRepairAddDialog, handleClose, idMachine, nameMachine} = props;

    function onCompleted() {
        setMachine(initMachine);
        setServices(initServices);
        setText([]);
        setActiveStep(1);
        handleClose();
    }

    const [addStopTime,
        {loading: mutationLoading, error: mutationError},

    ] = useMutation(ADD_STOP_TIME, {onCompleted});
    const [activeStep, setActiveStep] = React.useState(1);
    const classes = useStyles();
    const formatDT = "dd MMMM yyyy г. HH:mm";
    const [steps, setSteps] = React.useState({
        step1: 'Оборудование: ',
        step2: 'Службы: ',
        step3: 'Начало простоя: ',
        step4: 'Окончание простоя: ',
        step5: 'Описание неисправности: ',
        step6: 'Проверка и добавление: '

    });

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
    const [selectedDateStart, handleDateChangeStart] = React.useState(new Date());
    const [selectedTimeStart, handleTimeChangeStart] = React.useState(new Date());
    const [selectedDateStop, handleDateChangeStop] = React.useState(new Date());
    const [selectedTimeStop, handleTimeChangeStop] = React.useState(new Date());
    const [text, setText] = React.useState([]);

    const handleServiceSelect = (event) => {
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
        // setActiveStep(0);
        const array_service = services.array.filter((el) => (el.checked)).map(el => (el.id));
        addStopTime({
            variables: {
                machineId: idMachine,
                // dtStart: "2020-05-29T00:00:00Z",
                // dtStop: "2020-05-29T00:00:00Z",
                dtStart: selectedDateStart,
                dtStop: selectedDateStop,
                servicesID: array_service,
                text: text
            },

        }).then(r => {
        });
    };

    return (
        <Dialog fullScreen open={openRepairAddDialog} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar style={{color: "white", backgroundColor: "#3f51b5"}}>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Добавить простой
                    </Typography>
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
                    <StepLabel>{steps.step3}
                        {/*{(activeStep > 1 && DateIsValid(selectedDateStart) && DateIsValid(selectedTimeStart)) &&*/}
                        {activeStep > 1 &&
                        <DateTimeString date={selectedDateStart} time={selectedTimeStart}/>
                        // <p><b>{format(selectedDateStart, formatDT, {locale: ruLocale})}</b></p>
                        }
                    </StepLabel>
                    <StepContent>
                        <DateTimeSelect selectedDate={selectedDateStart}
                                        selectedTime={selectedTimeStart}
                                        handleDateChange={handleDateChangeStart}
                                        handleTimeChange={handleTimeChangeStart}
                        />
                        <ButtonGroupDialog
                            disableNext={!DateIsValid(selectedDateStart) && !DateIsValid(selectedTimeStart)}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </StepContent>
                </Step>
                <Step key='step4'>
                    <StepLabel>{steps.step4}
                        {/*{(activeStep > 2 && DateIsValid(selectedDateStop) && DateIsValid(selectedTimeStop)) &&*/}
                        {/*<p><b>{format(selectedDateStop, formatDT, {locale: ruLocale})}</b></p>*/}
                        {/*}*/}
                        {activeStep > 2 &&
                        <DateTimeString date={selectedDateStop} time={selectedTimeStop}/>
                            // <p><b>{format(selectedDateStart, formatDT, {locale: ruLocale})}</b></p>
                        }
                    </StepLabel>
                    <StepContent>
                        <DateTimeSelect
                            selectedDate={selectedDateStop}
                            selectedTime={selectedTimeStop}
                            handleDateChange={handleDateChangeStop}
                            handleTimeChange={handleTimeChangeStop}
                        />
                        <ButtonGroupDialog
                            disableNext={!DateIsValid(selectedDateStop)}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </StepContent>
                </Step>
                <Step key='step5'>
                    <StepLabel>{steps.step5} <b>{text}</b></StepLabel>
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
                <Step key='step6'>
                    <StepLabel>{steps.step6}</StepLabel>
                    <StepContent>
                        {mutationLoading &&
                        <div className={classes.rootProgress}>
                            <LinearProgress/>
                        </div>}
                        {mutationError && <p><b>Не удалось добавить простой</b></p>}
                        <ButtonGroupDialog
                            handleBack={handleBack}
                            handleNext={handleFinish}
                            finishStepText='Добавить простой'
                        />
                    </StepContent>
                </Step>
            </Stepper>
        </Dialog>
    )
}

StopTimeAddDialog.propTypes = {
    openRepairAddDialog: PropTypes.bool,
    handleClose: PropTypes.func,
    idMachine: PropTypes.string,
    nameMachine: PropTypes.string
};

