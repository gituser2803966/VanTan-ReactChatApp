import React, { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useSocket } from '../contexts/SocketProvider';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Avatar, IconButton } from "@material-ui/core";
// material-ui
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import WifiIcon from "@material-ui/icons/Wifi";
import BluetoothIcon from "@material-ui/icons/Bluetooth";
import { deepPurple } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";

export default function SideBarSettingModal({ onCloseDialog, isShowDialog }) {
  const {
    authState: { user },
    Signout,
  } = useAuth();
  const socket  = useSocket();
  const [checked, setChecked] = useState(["wifi"]);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleLogout = async () => {
    setOpenBackdrop(true);
    socket.emit("user logout",{user})
    await Signout();
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const useStyles = makeStyles((theme) => ({
    DialogTitleBackgroundColor: {
      background: "#497799",
      color: "white",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    input: {
      display: "none",
    },
    uploadContainer: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      borderRadius: "50%",
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    logoutText: {
      color: "#fff",
    },
  }));

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: "#ffffff",
    },
  });

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
    );
  });

  const classes = useStyles();

  return (
    <Dialog
      onClose={onCloseDialog}
      aria-labelledby="customized-dialog-title"
      open={isShowDialog}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle
        className={classes.DialogTitleBackgroundColor}
        id="customized-dialog-title"
        onClose={onCloseDialog}
      >
        <Button className={classes.logoutText} onClick={handleLogout}>
          Đăng Xuất
        </Button>
        <Box
          component="div"
          p={1}
          display="flex"
          alignItems="center"
          spacing={5}
        >
          <Box className={classes.uploadContainer}>
            <input
              accept="image/*"
              name="avatar"
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="inherit"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
          <Box p={1}>
            <Typography>{user.firstName + " " + user.lastName}</Typography>
            <Typography>{user.email}</Typography>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {/* <List
          subheader={<ListSubheader>Cài đặt</ListSubheader>}
          className={classes.root}
        >
          <ListItem>
            <ListItemIcon>
              <WifiIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={handleToggle("wifi")}
                checked={checked.indexOf("wifi") !== -1}
                inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BluetoothIcon />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-bluetooth"
              primary="Bluetooth"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={handleToggle("bluetooth")}
                checked={checked.indexOf("bluetooth") !== -1}
                inputProps={{
                  "aria-labelledby": "switch-list-label-bluetooth",
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List> */}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCloseDialog} color="primary">
          Lưu các thay đổi
        </Button>
      </DialogActions>
      {/* Backdrop */}
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
}
