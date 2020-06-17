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
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import { TimePicker, KeyboardTimePicker } from "@material-ui/pickers";

import MachineSelect from "./components/MachineSelect";
import ServicesSelect from "./components/ServicesSelect"
import ServicesText from "./components/ServicesText"
import MultilineTextFields from "./components/MultilineTextFields"

const useStyles = makeStyles(theme => ({
    // multilineTextFields: {
    //     '& .MuiTextField-root': {
    //         margin: theme.spacing(2),
    //         width: '100%',
    //
    //     },
    //     marginRight: theme.spacing(4),
    //     marginBottom: theme.spacing(3),
    // },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    // switches: {
    //     margin: theme.spacing(1),
    // },

    // marginBottom: {
    //     marginBottom: theme.spacing(3),
    // },
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

// function MultilineTextFields() {
//     const classes = useStyles();
//     const [value, setValue] = React.useState('Controlled');
//
//     const handleChange = (event) => {
//         setValue(event.target.value);
//     };
//
//     return (
//         <form className={classes.multilineTextFields} noValidate autoComplete="off">
//             <div>
//                 <TextField
//                     id="outlined-multiline-static"
//                     label=""
//                     multiline
//                     rows={4}
//                     defaultValue=""
//                     variant="outlined"
//                 />
//             </div>
//         </form>
//     );
// }

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ButtonGroup(props) {
    const classes = useStyles();
    const {disabledBack, disableNext, handleBack, handleNext, finishStepText} = props;
    return (
        <div className={classes.actionsContainer}>
            <div>
                <Button
                    disabled={disabledBack}
                    onClick={handleBack}
                    className={classes.button}
                >
                    Назад
                </Button>
                <Button
                    disabled={disableNext}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                >
                    {finishStepText ? finishStepText : 'Далее'}
                </Button>
            </div>
        </div>
    )
}

ButtonGroup.propTypes = {
    disabledBack: PropTypes.bool,
    disableNext: PropTypes.bool,
    handleBack: PropTypes.func,
    handleNext: PropTypes.func,
    finishStepText: PropTypes.string
};

export default function StopTimeAddDialog(props) {
    const {openRepairAddDialog, handleClose, idMachine, nameMachine} = props;
    const [activeStep, setActiveStep] = React.useState(1);
    const classes = useStyles();
    const [steps, setSteps] = React.useState({
        step1: 'Оборудование: ',
        step2: 'Службы: ',
        step3: 'Начало простоя: ',
        step4: 'Окончание простоя: ',
        step5: 'Описание неисправности: ',
        step6: 'Проверка и отправка: '

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

    const [machine, setMachine] = React.useState(initMachine);
    const [services, setServices] = React.useState(initServices);
    const [text, setText] = React.useState('');

    const [selectedDate, handleDateChange] = React.useState(new Date());

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
                <Toolbar style={{color: "white", backgroundColor: "#3f51b5"}}>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Добавить простой
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
                        <Typography> <MachineSelect nameMachine={machine.nameMachine}/> </Typography>
                        <ButtonGroup
                            disabledBack={true}
                            handleNext={handleNext}
                        />
                    </StepContent>
                </Step>
                <Step key='step2'>
                    <StepLabel>{steps.step2} <ServicesText services={services.array}/></StepLabel>
                    <StepContent>
                        <Typography><ServicesSelect services={services.array}
                                                    handleChange={handleServiceSelect}/></Typography>
                        <ButtonGroup
                            disableNext={services.array.filter((el) => (el.checked)).length === 0}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </StepContent>
                </Step>
                <Step key='step3'>
                    <StepLabel>{steps.step3}</StepLabel>
                    <StepContent>
                        <DatePicker
                            disableToolbar
                            autoOk={true}
                            variant="inline"
                            label="Дата"
                            helperText="Дата"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                        <TimePicker
                            ampm={false}
                            variant="inline"
                            label="Время"
                            helperText="Время"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                        {/*<Typography><MultilineTextFields text={text}*/}
                        {/*                                 handleChange={handleTextChange}/></Typography>*/}
                        <ButtonGroup
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </StepContent>
                </Step>
                <Step key='step4'>
                    <StepLabel>{steps.step4}</StepLabel>
                    <StepContent>
                        {/*<Typography><MultilineTextFields text={text}*/}
                        {/*                                 handleChange={handleTextChange}/></Typography>*/}
                        <ButtonGroup
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </StepContent>
                </Step>
                <Step key='step5'>
                    <StepLabel>{steps.step5} <b>{text}</b></StepLabel>
                    <StepContent>
                        <Typography><MultilineTextFields text={text}
                                                         handleChange={handleTextChange}/></Typography>
                        <ButtonGroup
                            disableNext={text.length === 0}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </StepContent>
                </Step>
                <Step key='step6'>
                    <StepLabel>{steps.step6}</StepLabel>
                    <StepContent>
                        {/*<Typography></Typography>*/}
                        <ButtonGroup
                            handleBack={handleBack}
                            handleNext={handleNext}
                            finishStepText='Отправить заявку'
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

