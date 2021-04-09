import React, { useEffect, useState } from "react";
import "./SideBar.css";
import { useAuth } from "../contexts/AuthContext";
import SideBarContent from "./SideBarContent";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, IconButton } from "@material-ui/core";
// material-ui
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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

function SideBar() {
  const [isShowDialog, setIsShowDialog] = React.useState(false);
  const [checked, setChecked] = React.useState(["wifi"]);

  const { currentUser, getUserCredentialWithSessionCooki } = useAuth();
  // console.log("currentUser SIDE BAR ***", currentUser);

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
  //
  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  //custom material theme
  const useStyles = makeStyles((theme) => ({
    DialogBackgroundColor: {
      background: "#497799",
      color: "white",
    },
    largeAvatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    tab: {
      flexGrow: 1,
      maxWidth: 500,
    },
  }));

  //
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
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

  const handleClickOpen = () => {
    setIsShowDialog(true);
  };
  const handleClose = () => {
    setIsShowDialog(false);
  };

  //
  const classes = useStyles();

  //

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        {/* avatar */}

        <Button onClick={handleClickOpen}>
          <Avatar />
        </Button>
        {/*  */}
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={isShowDialog}
        >
          <DialogTitle
            className={classes.DialogBackgroundColor}
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Setting
            <Box
              component="div"
              p={2}
              display="flex"
              alignItems="center"
              spacing={5}
            >
              <Avatar className={classes.largeAvatar}>OP</Avatar>
              <Box p={1}>{currentUser && currentUser.user.email}</Box>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <List
              subheader={<ListSubheader>Settings</ListSubheader>}
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
            </List>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
        <div className="header__right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebarSearch">
        <div className="sidebarContainer">
          <SearchIcon />
          <input type="text" placeholder="enter ..." />
        </div>
      </div>
      <div className="sidebar__conversation">
        <SideBarContent />
      </div>
    </div>
  );
}

export default SideBar;
