import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import './LoadingCircularProgress.css';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: "flex",
  //   flex: 1,
  //   "& > * + *": {
  //     marginLeft: theme.spacing(2)
  //   },
  //   justifyContent: "center",
  //   alignItems: "flex-end"
  // }
}));

export default function LoadingCircularProgress() {
  const classes = useStyles();

  return (
    <div className="loadingCircularProgressContainer">
      <CircularProgress 
        size={40}
      />
      <h2>Loading ...</h2>
    </div>
  );
}
