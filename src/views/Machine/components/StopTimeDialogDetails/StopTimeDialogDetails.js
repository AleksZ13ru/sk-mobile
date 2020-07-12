import React, {useEffect} from 'react';
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
import DateTimeSelect from "./components/DateTimeSelect";
import ButtonGroupDialog from "../../../../components/ButtonGroupDialog"
import {loader} from "graphql.macro";
import {useMutation} from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";
import DateTimeString from "./components/DateTimeString";
import {useQuery} from "react-apollo";
import Loading from "../../../../components/Loading/Loading";
import Error from "../../../../components/Error/Error";

const STOP_TIME_QUERY = loader('../../Graphql/STOP_TIME_QUERY.graphql');
const STOP_TIME_EDIT = loader('../../Graphql/STOP_TIME_EDIT.graphql');

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

export default function StopTimeDialogDetails(props) {
    const {open, handleClose, stopId, handleUpdateMachine} = props;
    const initPollInterval = 5000;
    const [pollInterval, setPollInterval] = React.useState(initPollInterval);

    function onCompleted() {
        // setMachine(initMachine);
        setServices(initServices);
        setText([]);
        setActiveStep(4);
        handleClose();
    }

    useEffect(() => {
        if (open) {
            setPollInterval(initPollInterval)
        } else {
            setPollInterval(0)
        }

    }, [open]);
    // const [addStopTime,
    //     {loading: mutationLoading, error: mutationError},
    //
    // ] = useMutation(ADD_STOP_TIME, {onCompleted});
    const [activeStep, setActiveStep] = React.useState(5);
    const classes = useStyles();

    const steps = {
        step1: 'Оборудование: ',
        step2: 'Службы: ',
        step3: 'Начало простоя: ',
        step4: 'Окончание простоя: ',
        step5: 'Описание неисправности: ',
        step6: 'Продолжительность: '
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

    // const initMachine = {
    //     idMachine: idMachine,
    //     nameMachine: nameMachine,
    // };

    // const [machine, setMachine] = React.useState(initMachine);
    const [services, setServices] = React.useState(initServices);
    const [selectedDateStart, handleDateChangeStart] = React.useState(new Date());
    const [selectedTimeStart, handleTimeChangeStart] = React.useState(new Date());
    const [selectedDateStop, handleDateChangeStop] = React.useState(new Date());
    const [selectedTimeStop, handleTimeChangeStop] = React.useState(new Date());
    const [text, setText] = React.useState([]);

    const {loading, error, data} = useQuery(STOP_TIME_QUERY, {
        variables: {"pk": +stopId},
        // pollInterval: {pollInterval},
    });

    if (loading) return (<Loading/>);
    if (error) return (<Error/>);

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
        const array_service = services.array.filter((el) => (el.checked)).map(el => (el.id));
        // addStopTime({
        //     variables: {
        //         machineId: idMachine,
        //         // dtStart: "2020-05-29T00:00:00Z",
        //         // dtStop: "2020-05-29T00:00:00Z",
        //         dtStart: selectedDateStart,
        //         dtStop: selectedDateStop,
        //         servicesID: array_service,
        //         text: text
        //     },
        //
        // }).then(r => {
        // });
    };

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar style={{color: "white", backgroundColor: "#3f51b5"}}>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Детали простоя № {stopId}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Stepper activeStep={activeStep} orientation="vertical">
                <Step key='step1'>
                    <StepLabel>{steps.step1} <b>{data.stopTimeList.machine.name}</b></StepLabel>
                    <StepContent>
                    </StepContent>
                </Step>
                <Step key='step2'>
                    <StepLabel>{steps.step2} <b>{data.stopTimeList.services.map(el => `${el.name} `)}</b></StepLabel>
                    <StepContent>
                    </StepContent>
                </Step>
                <Step key='step3'>
                    <StepLabel>{steps.step3}
                        {/*<DateTimeString date={data.stopTimeList.dayStart.day} time={data.stopTimeList.timeStart}/>*/}
                        {/*const [selectedDateStop, handleDateChangeStop] = React.useState(new Date());*/}
                        {/*const [selectedTimeStop, handleTimeChangeStop] = React.useState(new Date());*/}
                        <DateTimeString
                            date={new Date(`${data.stopTimeList.dayStart.day} ${data.stopTimeList.timeStart}`.split(' ').join('T'))}
                            time={new Date(`${data.stopTimeList.dayStart.day} ${data.stopTimeList.timeStart}`.split(' ').join('T'))}/>
                    </StepLabel>
                </Step>
                <Step key='step4'>
                    <StepLabel>{steps.step4}
                        {/*<DateTimeString date={data.stopTimeList.dayStop.day} time={data.stopTimeList.timeStop}/>*/}
                        <DateTimeString
                            date={new Date(`${data.stopTimeList.dayStop.day} ${data.stopTimeList.timeStop}`.split(' ').join('T'))}
                            time={new Date(`${data.stopTimeList.dayStop.day} ${data.stopTimeList.timeStop}`.split(' ').join('T'))}/>
                    </StepLabel>
                </Step>
                <Step key='step5'>
                    <StepLabel>{steps.step5} <b>{data.stopTimeList.text}</b></StepLabel>
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
                    <StepLabel>{steps.step6} <b>{data.stopTimeList.deltaTime.toFixed(1)} ч.</b></StepLabel>
                    <StepContent>
                    </StepContent>
                </Step>
            </Stepper>
        </Dialog>
    )
}

StopTimeDialogDetails.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleUpdateMachine: PropTypes.func,
    stopId: PropTypes.string,
};

