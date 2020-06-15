import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    content: {
        marginTop: theme.spacing(1)
    }

}));

export default function Loading() {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <Card>
                <CardContent>
                    <List component="nav" aria-label="main mailbox folders">
                        <CircularProgress />
                        {/*<ListSubheader component="div" id="nested-list-subheader">*/}
                        {/*    Загрузка ...*/}
                        {/*</ListSubheader>*/}
                    </List>
                </CardContent>
            </Card>
        </div>
    )
}
