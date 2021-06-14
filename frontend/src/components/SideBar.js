import React, { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import "./SideBar.css";
import TabsPanel from "./SideBarContent";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { Box, IconButton, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SideBarSettingModal from "./SideBarSettingModal";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";

function SideBar() {
  const {
    authState: { user },
  } = useAuth();

  const [isShowDialog, setIsShowDialog] = useState(false);

  const onShowDialog = () => {
    setIsShowDialog(true);
  };

  const onCloseDialog = () => {
    setIsShowDialog(false);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    userNameText: {
      color: "black",
    },
  }));

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const classes = useStyles();

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => {
              setIsShowDialog(true);
            }}
          >
            <div className="active__icon">
              <Avatar className={classes.purple}>
                <Typography variant="body2">
                  {user.firstName.substring(0, 1) +
                    "" +
                    user.lastName.substring(0, 1)}
                </Typography>
              </Avatar>
              <div className="user__online__circle"></div>
            </div>
          </Button>
          <Box>
            <Typography className={classes.userNameText} variant="body2">
              {user.firstName + " " + user.lastName}
            </Typography>
          </Box>
        </div>
        {/* Setting Dialog  */}
        <SideBarSettingModal
          isShowDialog={isShowDialog}
          onShowDialog={onShowDialog}
          onCloseDialog={onCloseDialog}
        />
        <div className="header__right">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebarSearchContainer">
        <div className="sidebarSearch">
          <SearchIcon />
          <form onSubmit={handleSearch}>
            <input type="text" placeholder="enter ..." />
          </form>
        </div>
      </div>

      {/* Tabs => conversation, contact, call tab */}
      <TabsPanel />
      {/* </div> */}
    </div>
  );
}

export default SideBar;
