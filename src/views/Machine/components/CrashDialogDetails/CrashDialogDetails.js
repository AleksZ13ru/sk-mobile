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
import MultilineTextFields from "../MultilineTextFields"
import ButtonGroupDialog from "../../../../components/ButtonGroupDialog";
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
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

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
    chip: {
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

export default function CrashDialogDetails(props) {
    const classes = useStyles();
    const {open, handleClose, crashId, handleUpdateMachine} = props;
    const initPollInterval = 5000;
    const [pollInterval, setPollInterval] = React.useState(initPollInterval);
    const initState = {
        checkedRewrite: false,
    };

    function onCompleted() {
        // setMachine(initMachine);
        // setServices(initServices);
        setState(initState);
        setText([]);
        setActiveStep(3);
        handleClose();
    }

    const [crashEdit,
        {loading: mutationLoading, error: mutationError},

    ] = useMutation(CRASH_EDIT, {onCompleted});

    const [activeStep, setActiveStep] = React.useState(3);

    const steps = {
        step1: 'Оборудование: ',
        step2: 'Службы: ',
        step3: 'Описание неисправности: ',
        step4: 'Добавить комментарий: ',
        step5: 'Проверка и отправка'
    };

    useEffect(() => {
        if (open) {
            setPollInterval(initPollInterval)
        }else{
            setPollInterval(0)
        }

    },[open]);

    const [text, setText] = React.useState([]);
    const [state, setState] = React.useState(initState);
    const {loading, error, data} = useQuery(CRASH_QUERY, {
        variables: {"pk": +crashId},
        // pollInterval: {pollInterval},
    });

    if (loading) return (<Loading/>);
    if (error) return (<Error/>);



    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                // finish: state.checkedFinish,
                // doNotAgree: state.checkedDoNotAgree,
                rewrite: state.checkedRewrite,
                text: text
            },

        }).then(r => {
        });
        // handleUpdateMachine()
    };

    let formatter = new Intl.DateTimeFormat("ru", {
        day: "numeric",
        // year: "numeric",
        // weekday: "long",
        month: "numeric",
        hour: "numeric",
        minute: "numeric"
    });


    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                {/*<Toolbar style={{color: "white", backgroundColor: "#ff9800"}}>*/}
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Детали ремонта №{crashId}
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
                    <StepLabel>{steps.step2} <b>{data.crashElement.services.map(el => `${el.name} `)}</b></StepLabel>
                    <StepContent>
                    </StepContent>
                </Step>
                <Step key='step3'>
                    <StepLabel>{steps.step3} <b>{data.crashElement.text}</b>
                        {data.crashElement.messages.map(el => {
                            let secondary = `${formatter.format(new Date(el.dtCreate))} ${el.postedBy.username} `;
                            return (
                                <Grid
                                    key={el.id}
                                    container
                                    spacing={1}
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center">
                                    <Grid item xs={1}>
                                        {el.doNotAgree &&
                                        <FiberManualRecordIcon fontSize="small" color="secondary"/>}
                                        {el.code === 'STR' &&
                                        <FiberManualRecordIcon fontSize="small" style={{color: '#4caf50'}}/>}
                                        {el.code === 'FNS' &&
                                        <FiberManualRecordIcon fontSize="small" color="primary"/>}
                                    </Grid>
                                    <Grid item xs={11}>
                                        <ListItemText primary={el.text} secondary={secondary}/>
                                    </Grid>
                                </Grid>
                                // <ListItemText primary={el.text} secondary= {secondary} />
                                // <div>
                                //     <p>
                                //         <i> {formatter.format(new Date(el.dtCreate))} </i> {el.postedBy.username}:
                                //     </p>
                                //     <p> <b>{el.text}</b></p>
                                // </div>
                            )
                        })}
                    </StepLabel>
                    <StepContent>
                    </StepContent>
                </Step>
                <Step key='step4'>
                    <StepLabel>{steps.step4}
                        <div className={classes.chip}>
                            {state.checkedRewrite && <Chip size="small" label="Повторный вызов" color="secondary"/>}
                            {/*{state.checkedFinish && <Chip size="small" label="Завершен" color="primary"/>}*/}
                        </div>
                        <b>{text}</b>
                    </StepLabel>
                    <StepContent>
                        <FormControl component="fieldset">
                            <FormGroup className={classes.marginBottom}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={state.checkedRewrite}
                                            onChange={handleChange}
                                            name="checkedRewrite"/>}
                                    label="Повторный вызов"
                                />
                                {/*<FormControlLabel*/}
                                {/*    control={*/}
                                {/*        <Switch*/}
                                {/*            checked={state.checkedFinish}*/}
                                {/*            onChange={handleChange}*/}
                                {/*            name="checkedFinish"*/}
                                {/*            color="primary"*/}
                                {/*        />*/}
                                {/*    }*/}
                                {/*    label="Ремонт завершен"*/}
                                {/*/>*/}
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
                            nextStepText={'Сохранить заметку'}
                        />
                    </StepContent>
                </Step>
            </Stepper>
        </Dialog>
    )
}

CrashDialogDetails.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleUpdateMachine: PropTypes.func,
    crashId: PropTypes.string,
};

