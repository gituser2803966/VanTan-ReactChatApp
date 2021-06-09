import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useConversation } from "../contexts/ConversationsProvider";
import "./Dashboard.css";
import SideBar from "./SideBar";
import OpenChat from "./OpenChat";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    maxHeight:"100vh",
    minWidth: "960px",
    display: "flex",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Dashboard() {
  const { selectedConversation } = useConversation();

  function AppBody() {
    return (
      <React.Fragment>
        <Grid
          item
          xs={4}
          style={{
            borderWidth: "0px 1px 0px 0px",
            borderStyle: "solid",
            borderColor: "rgb(213, 217, 222)",
          }}
        >
          <SideBar />
        </Grid>
        <Grid item xs={8}>
          {selectedConversation && <OpenChat />}
        </Grid>
      </React.Fragment>
    );
  }

  const classes = useStyles();
    
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid
          container
          direction="row"
          item
          xs={12}
          style={{ height: "100%", backgroundColor: "rgb(240, 244, 248)" }}
        >
          <AppBody />
        </Grid>
      </Container>
    </div>
  );
}

export default Dashboard;
