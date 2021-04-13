import React from "react";
import { useConversation } from "../contexts/ConversationContext";
import "./Dashboard.css";
import SideBar from "./SideBar";
import OpenChat from "./OpenChat";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";

function Dashboard() {
  const useStyles = makeStyles((theme) => ({
    app: {
      flexGrow: 1,
      height:"100vh",
      display:"flex",
      // background:"#dadbd3",
      background: "#dadbd3",

    },
    app__body: {
      flexGrow: 1,
      height: "100vh",
      background: "#ededed",
    },
    sideBar:{

    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    openChat: {
      // background: "#ededed",
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

  const { selectedConversation } = useConversation();

  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.app}>
      <Container maxWidth="md" className={classes.app__body}>
        {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
        <Grid
          container
          direction="row"
          // justify="center"
          // alignItems="center"
        >
          <Grid item xs>
           <Box component="div" className={classes.sideBar}>
           <SideBar />
           </Box>
          </Grid>
          <Grid item xs={8} className={classes.openChat}>
            3456
            {/* <Paper className={classes.paper}>xs=12 sm=6</Paper> */}
            {/* {selectedConversation && <OpenChat />} */}
          </Grid>
        </Grid>
      </Container>
      </Container>

      {/* <Grid container className={classes.root} spacing={2}>
        <Container maxWidth="md">
          <Grid item xs>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
            <SideBar />
          </Grid>
          <Grid item xs={8} className={classes.openChat}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
            {selectedConversation && <OpenChat />}
          </Grid>
        </Container>
      </Grid> */}
    </React.Fragment>
  );
}

export default Dashboard;

// <div className="app">
//   <div className="app__body">
//     <SideBar />
//     {selectedConversation && <OpenChat />}
//   </div>
// </div>
