import React, {Fragment, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {store, setTitle} from "../../store";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {AUTH_TOKEN} from '../../constants'
import {loader} from "graphql.macro";
import {useMutation} from "@apollo/react-hooks";
import {useHistory} from "react-router-dom";

const LOGIN_MUTATION = loader('./Graphql/LOGIN_MUTATION.graphql');

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    content: {
        marginTop: theme.spacing(1)
    },
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    list: {
        paddingLeft: theme.spacing(0),
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    signInButton: {
        margin: theme.spacing(2, 0)
    }

}));

export default function SignInPage() {
    const classes = useStyles();
    const [userName, setUserName] = React.useState();
    const [pass, setPass] = React.useState();
    let history = useHistory();
    store.dispatch(setTitle('Сарансккабель'));

    // function handleChange() {
    // console.log(store.getState().searchMachine);
    // setSearchFilter(store.getState().searchMachine);
    // }

    // store.subscribe(handleChange);

    const confirm = async data => {
        const {token} = data.login;
        _saveUserData(token);
        history.push('/');
    };

    const _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    };

    const [tokenAuth,
        {loading: mutationLoading, error: mutationError},
    ] = useMutation(LOGIN_MUTATION, {});

    const handleLogin = () => {
        tokenAuth({
            variables: {
                username: "admin",
                password: "11112"
            },

        }).then(r => {
            const {token} = r.data.tokenAuth;
            console.log(token);
            _saveUserData(token);
            history.push('/');
        });
    };
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Card>
                    <CardContent>
                        <Typography
                            className={classes.title}
                            variant="h6"
                        >
                            Сарансккабель
                        </Typography>
                        <TextField
                            className={classes.textField}
                            // error={hasError('email')}
                            fullWidth
                            // helperText={
                            //     hasError('email') ? formState.errors.email[0] : null
                            // }
                            label="Пользователь"
                            name="email0"
                            onChange={(value) => setTitle(value)}
                            type="text"
                            value={userName}
                            variant="outlined"
                        />
                        <TextField
                            className={classes.textField}
                            // error={hasError('password')}
                            fullWidth
                            // helperText={
                            //     hasError('password') ? formState.errors.password[0] : null
                            // }
                            label="Пароль"
                            name="password"
                            onChange={(value) => setTitle(value)}
                            type="password"
                            value={pass}
                            variant="outlined"
                        />
                        <Button
                            className={classes.signInButton}
                            color="primary"
                            // disabled={!formState.isValid}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            onClick={() => handleLogin()}
                        >
                            Войти
                        </Button>
                    </CardContent>
                </Card>
            </div>

        </div>
    );

}


SignInPage.propTypes = {};
