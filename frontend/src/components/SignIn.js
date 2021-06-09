import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  buttonSubmit: {
    backgroundColor: green[500],
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function SignIn() {
  const { Signin } = useAuth();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [severity, setSeverity] = useState("warning");
  const [error, setError] = useState("");
  const [ShowAlertWhenEmailIsEmty, setShowAlertWhenEmailIsEmty] =
    useState(false);
  const [ShowAlertWhenPasswordIsEmty, setShowAlertWhenPasswordIsEmty] =
    useState(false);
  //
  const [loading, setLoading] = useState(false);
  //
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (email === "") {
      setError("");
      setSeverity("warning");
      setLoading(false);
      setShowAlertWhenEmailIsEmty(true);
      return;
    } else {
      setShowAlertWhenEmailIsEmty(false);
    }
    if (password === "") {
      setError("");
      setLoading(false);
      setShowAlertWhenPasswordIsEmty(true);
      return;
    } else {
      setShowAlertWhenPasswordIsEmty(false);
    }
    try {
      await Signin(email, password);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("error.response.data ****", error.response.data);
        setError(error.response.data.message);
        setSeverity("error");
        setShowAlertWhenEmailIsEmty(true);
        // setError("");
        // console.log("error.response.status ****", error.response.status);
        // console.log("error.response.headers ****", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("error.request ****", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("error.config **** ", error.config);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          {/* Alert  when the email is empty*/}

          <Collapse in={ShowAlertWhenEmailIsEmty}>
            <Alert
              severity={severity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setShowAlertWhenEmailIsEmty(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {error !== "" ? error : " Vui lòng nhập vào tài khoản của bạn"}
            </Alert>
          </Collapse>

          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Collapse in={ShowAlertWhenPasswordIsEmty}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setShowAlertWhenPasswordIsEmty(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {error ? error : "Vui lòng nhập vào mật khẩu"}
            </Alert>
          </Collapse>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <div className={classes.wrapper}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              // className={buttonClassname}
              disabled={loading}
              onClick={handleSubmit}
            >
              Đăng Nhập
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Quên mật khẩu
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup">{"Bạn chưa có tài khoản? đăng kí"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
