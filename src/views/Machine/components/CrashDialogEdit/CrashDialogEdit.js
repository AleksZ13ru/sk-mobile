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
import {useQuery} from "react-apollo";
import Loading from "../../../../components/Loading/Loading";
import Error from "../../../../components/Error/Error";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";

const CRASH_QUERY = loader('../../Graphql/CRASH_QUERY.graphql');
const CRASH_EDIT = loader('../../Graphql/CRASH_EDIT.graphql');

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
    chip:{
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CrashDialogEdit(props) {
    const classes = useStyles();
    const {open, handleClose, crashId, nameMachine, handleUpdateMachine} = props;

    function onCompleted() {
        setMachine(initMachine);
        setServices(initServices);
        setText([]);
        setActiveStep(1);
        handleClose();
    }

    const [crashEdit,
        {loading: mutationLoading, error: mutationError},

    ] = useMutation(CRASH_EDIT, {onCompleted});

    // const [addRepair,
    //     {loading: mutationLoading, error: mutationError},
    //
    // ] = useMutation(CRASH_ADD, {onCompleted});
    const [activeStep, setActiveStep] = React.useState(3);

    const [steps, setSteps] = React.useState({
        step1: 'Оборудование: ',
        step2: 'Службы: ',
        step3: 'Описание неисправности: ',
        step4: 'Выполненная работа: ',
        step5: 'Проверка и отправка'
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
        idMachine: 'idMachine',
        nameMachine: nameMachine,
    };

    const [machine, setMachine] = React.useState(initMachine);
    const [services, setServices] = React.useState(initServices);
    const [text, setText] = React.useState([]);
    const [state, setState] = React.useState({
        checkedA: false,
        checkedFinish: false,
    });
    const {loading, error, data, refetch} = useQuery(CRASH_QUERY, {
        variables: {"pk": crashId},
    });

    if (loading) return (<Loading/>);
    if (error) return (<Error/>);




    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
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
        // setActiveStep(0);
        crashEdit({
            variables: {
                crashId: crashId,
                // dtStart: "2020-05-29T00:00:00Z",
                finish: state.checkedFinish,
                text2: text
            },

        }).then(r => {
        });
        handleUpdateMachine()
    };

    // const [openRepairAddDialog, setOpenRepairAddDialog] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpenRepairAddDialog(true);
    // };

    // const handleClose = () => {
    //     setOpenRepairAddDialog(false);
    // };

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar style={{color: "white", backgroundColor: "#ff9800"}}>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Завершение ремонта {crashId}
                    </Typography>
                    {/*<Button autoFocus color="inherit" onClick={handleClose}>*/}
                    {/*    Х*/}
                    {/*</Button>*/}
                </Toolbar>
            </AppBar>
            <Stepper activeStep={activeStep} orientation="vertical">
                <Step key='step1'>
                    <StepLabel>{steps.step1} <b>{data.crashElement.machine.name}</b></StepLabel>
                    <StepContent>
                    </StepContent>
                </Step>
                <Step key='step2'>
                    <StepLabel>{steps.step2} <b>{data.crashElement.services.map(el=>`${el.name} `)}</b></StepLabel>
                    <StepContent>
                    </StepContent>
                </Step>
                <Step key='step3'>
                    <StepLabel>{steps.step3} <b>{data.crashElement.text}</b></StepLabel>
                    <StepContent>
                    </StepContent>
                </Step>
                <Step key='step4'>
                    <StepLabel>{steps.step4}
                        <div className={classes.chip}>
                            {state.checkedA && <Chip size="small" label="Не согласен" color="secondary"/>}
                            {state.checkedFinish && <Chip size="small" label="Завершен" color="primary" />}
                        </div>
                        <b>{text}</b>
                    </StepLabel>
                    <StepContent>
                        <FormControl component="fieldset">
                            <FormGroup className={classes.marginBottom}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={state.checkedA}
                                            onChange={handleChange}
                                            name="checkedA" />}
                                    label="С вызовом не согласен"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={state.checkedFinish}
                                            onChange={handleChange}
                                            name="checkedFinish"
                                            color="primary"
                                        />
                                    }
                                    label="Ремонт завершен"
                                />

                            </FormGroup>
                            {/*<FormHelperText>Be careful</FormHelperText>*/}
                        </FormControl>
                        <MultilineTextFields text={text}
                                             handleChange={handleTextChange}/>
                        {/*</Typography>*/}
                        <ButtonGroupDialog
                            disableNext={text.length === 0}
                            disabledBack={true}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </StepContent>
                </Step>
                <Step key='step5'>
                    <StepLabel>{steps.step5}</StepLabel>
                    <StepContent>
                        {/*<Typography></Typography>*/}
                        {mutationLoading &&
                        <div className={classes.rootProgress}>
                            <LinearProgress/>
                        </div>}
                        {mutationError && <p><b>Не удалось отправить данные</b></p>}
                        <ButtonGroupDialog
                            handleBack={handleBack}
                            handleNext={handleFinish}
                            // backStepText='Ремонт не завершен'
                            nextStepText= {state.checkedFinish ? 'Завершить ремонт' : 'Сохранить заметку'}
                        />
                    </StepContent>
                </Step>
            </Stepper>
        </Dialog>
    )
}

CrashDialogEdit.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleUpdateMachine: PropTypes.func,
    crashId: PropTypes.string,
};

