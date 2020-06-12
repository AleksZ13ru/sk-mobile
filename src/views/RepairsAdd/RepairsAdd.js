import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import ListSubheader from "@material-ui/core/ListSubheader";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import InfoIcon from "@material-ui/icons/Info";
// import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import Paper from "@material-ui/core/Paper";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
        },
        width: '100%',
    },
    content: {
        padding: theme.spacing(0),
        margin: theme.spacing(0),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
    },
    // row: {
    //     height: '42px',
    //     display: 'flex',
    //     alignItems: 'center',
    //     marginTop: theme.spacing(1)
    // },
    list: {
        paddingLeft: theme.spacing(0),
    },

    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(1),
    },
    resetContainer: {
        padding: theme.spacing(2),
    },

}));

function getSteps() {
    return ['Оборудование', 'Службы', 'Описание'];
}

// const top100Films = [
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
//     { title: 'The Dark Knight', year: 2008 },
//     { title: '12 Angry Men', year: 1957 },
//     { title: "Schindler's List", year: 1993 },
//     { title: 'Pulp Fiction', year: 1994 },
//     { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
//     { title: 'The Good, the Bad and the Ugly', year: 1966 },
//     { title: 'Fight Club', year: 1999 },
//     { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
//     { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
//     { title: 'Forrest Gump', year: 1994 },
//     { title: 'Inception', year: 2010 },
//     { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
//     { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
//     { title: 'Goodfellas', year: 1990 },
//     { title: 'The Matrix', year: 1999 },
//     { title: 'Seven Samurai', year: 1954 },
//     { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
//     { title: 'City of God', year: 2002 },
//     { title: 'Se7en', year: 1995 },
//     { title: 'The Silence of the Lambs', year: 1991 },
//     { title: "It's a Wonderful Life", year: 1946 },
//     { title: 'Life Is Beautiful', year: 1997 },
//     { title: 'The Usual Suspects', year: 1995 },
//     { title: 'Léon: The Professional', year: 1994 },
//     { title: 'Spirited Away', year: 2001 },
//     { title: 'Saving Private Ryan', year: 1998 },
//     { title: 'Once Upon a Time in the West', year: 1968 },
//     { title: 'American History X', year: 1998 },
//     { title: 'Interstellar', year: 2014 },
//     { title: 'Casablanca', year: 1942 },
//     { title: 'City Lights', year: 1931 },
//     { title: 'Psycho', year: 1960 },
//     { title: 'The Green Mile', year: 1999 },
//     { title: 'The Intouchables', year: 2011 },
//     { title: 'Modern Times', year: 1936 },
//     { title: 'Raiders of the Lost Ark', year: 1981 },
//     { title: 'Rear Window', year: 1954 },
//     { title: 'The Pianist', year: 2002 },
//     { title: 'The Departed', year: 2006 },
//     { title: 'Terminator 2: Judgment Day', year: 1991 },
//     { title: 'Back to the Future', year: 1985 },
//     { title: 'Whiplash', year: 2014 },
//     { title: 'Gladiator', year: 2000 },
//     { title: 'Memento', year: 2000 },
//     { title: 'The Prestige', year: 2006 },
//     { title: 'The Lion King', year: 1994 },
//     { title: 'Apocalypse Now', year: 1979 },
//     { title: 'Alien', year: 1979 },
//     { title: 'Sunset Boulevard', year: 1950 },
//     { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
//     { title: 'The Great Dictator', year: 1940 },
//     { title: 'Cinema Paradiso', year: 1988 },
//     { title: 'The Lives of Others', year: 2006 },
//     { title: 'Grave of the Fireflies', year: 1988 },
//     { title: 'Paths of Glory', year: 1957 },
//     { title: 'Django Unchained', year: 2012 },
//     { title: 'The Shining', year: 1980 },
//     { title: 'WALL·E', year: 2008 },
//     { title: 'American Beauty', year: 1999 },
//     { title: 'The Dark Knight Rises', year: 2012 },
//     { title: 'Princess Mononoke', year: 1997 },
//     { title: 'Aliens', year: 1986 },
//     { title: 'Oldboy', year: 2003 },
//     { title: 'Once Upon a Time in America', year: 1984 },
//     { title: 'Witness for the Prosecution', year: 1957 },
//     { title: 'Das Boot', year: 1981 },
//     { title: 'Citizen Kane', year: 1941 },
//     { title: 'North by Northwest', year: 1959 },
//     { title: 'Vertigo', year: 1958 },
//     { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
//     { title: 'Reservoir Dogs', year: 1992 },
//     { title: 'Braveheart', year: 1995 },
//     { title: 'M', year: 1931 },
//     { title: 'Requiem for a Dream', year: 2000 },
//     { title: 'Amélie', year: 2001 },
//     { title: 'A Clockwork Orange', year: 1971 },
//     { title: 'Like Stars on Earth', year: 2007 },
//     { title: 'Taxi Driver', year: 1976 },
//     { title: 'Lawrence of Arabia', year: 1962 },
//     { title: 'Double Indemnity', year: 1944 },
//     { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
//     { title: 'Amadeus', year: 1984 },
//     { title: 'To Kill a Mockingbird', year: 1962 },
//     { title: 'Toy Story 3', year: 2010 },
//     { title: 'Logan', year: 2017 },
//     { title: 'Full Metal Jacket', year: 1987 },
//     { title: 'Dangal', year: 2016 },
//     { title: 'The Sting', year: 1973 },
//     { title: '2001: A Space Odyssey', year: 1968 },
//     { title: "Singin' in the Rain", year: 1952 },
//     { title: 'Toy Story', year: 1995 },
//     { title: 'Bicycle Thieves', year: 1948 },
//     { title: 'The Kid', year: 1921 },
//     { title: 'Inglourious Basterds', year: 2009 },
//     { title: 'Snatch', year: 2000 },
//     { title: '3 Idiots', year: 2009 },
//     { title: 'Monty Python and the Holy Grail', year: 1975 },
// ];

function ComboBox() {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Наименование</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={age}
                onChange={handleChange}
                label="Наименование"
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Troester CV-Line</MenuItem>
                <MenuItem value={2}>Proton</MenuItem>
                <MenuItem value={3}>Frigeco SLP120 #1</MenuItem>
            </Select>
        </FormControl>
    );
}

function SwitchesGroup() {
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Assign responsibility</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={state.gilad} onChange={handleChange} name="gilad" />}
                    label="Gilad Gray"
                />
                <FormControlLabel
                    control={<Switch checked={state.jason} onChange={handleChange} name="jason" />}
                    label="Jason Killian"
                />
                <FormControlLabel
                    control={<Switch checked={state.antoine} onChange={handleChange} name="antoine" />}
                    label="Antoine Llorca"
                />
            </FormGroup>
            <FormHelperText>Be careful</FormHelperText>
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
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    variant="outlined"
                />
            </div>
        </form>
    );
}

function getStepContent(step) {

    switch (step) {
        case 0:
            return (
                <ComboBox/>
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

function RepairsAdd() {
    const classes = useStyles();
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

    return (
        <div className={classes.root}>
            {/*<div className={classes.row}>*/}
            {/*    <SearchInput/>*/}
            {/*</div>*/}
            <div className={classes.content}>

                <Card>
                    <CardContent className={classes.content}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        <Typography>{getStepContent(index)}</Typography>
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    className={classes.button}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleNext}
                                                    className={classes.button}
                                                >
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default RepairsAdd;
