import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import NewConversationDialog from "./NewConversationDialog";
import { useConversation } from "../contexts/ConversationsProvider";

function Conversation() {
  const { myConversations } = useConversation();

  const [isOpenNewConversationModal, setIsOpenNewConversationModal] =
    useState(false);

  const handleOpenModal = () => {
    setIsOpenNewConversationModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenNewConversationModal(false);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    selectedListItem: {
      "&$selected": {
        backgroundColor: "#1976d2",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#1976d2",
        },
      },
    },
    selected: {
      backgroundColor: "#4791db",
    },
    headerConversations: {
      display: "flex",
      // padding: 10,
      justifyContent: "space-between",
      alignItems: "center",
    },
    newConversationButton: {
      background: "#1976d2",
      color: "#ffffff",
      "&:hover": {
        background: "#1976d2",
      },
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <div className={classes.headerConversations}>
        {/* show new conversation modal */}
        <NewConversationDialog
          open={isOpenNewConversationModal}
          onClose={handleCloseModal}
        />
        <Typography>Cuộc trò chuyện</Typography>
        <Box component="div">
          <Button
            variant="contained"
            className={classes.newConversationButton}
            // color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
          >
            New
          </Button>
        </Box>
      </div>
      <div>
        <List dense className={classes.root}>
          {myConversations.map((conversation, index) => {
            const labelId = `checkbox-list-secondary-label-${index}`;
            return (
              <ListItem
                // disableGutters
                key={index}
                classes={{
                  root: classes.selectedListItem,
                  selected: classes.selected,
                }}
                button
                // selected={conversation.selected}
                onClick={() => {
                  // selectConversationIndex(index);
                }}
              >
                <ListItemAvatar>
                  <Avatar>N</Avatar>
                </ListItemAvatar>
                <ListItemText id={labelId} primary={conversation.name} />
                {/* <ListItemSecondaryAction>time</ListItemSecondaryAction> */}
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
}

export default Conversation;
