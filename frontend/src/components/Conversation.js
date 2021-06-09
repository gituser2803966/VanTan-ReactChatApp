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
  const { conversations, selectConversationIndex } = useConversation();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
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
        <NewConversationDialog
          open={open}
          onClose={handleClose}
        />
        <Typography>Cuộc trò chuyện</Typography>
        <Box component="div">
          <Button
            variant="contained"
            className={classes.newConversationButton}
            // color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            New
          </Button>
        </Box>
      </div>
      <div>
        <List dense className={classes.root}>
          {conversations.map((conversation, index) => {
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
                selected={conversation.selected}
                onClick={() => {
                  selectConversationIndex(index);
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${index + 1}`}
                    src={`/static/images/avatar/${index + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={conversation.recipients
                    .map((r) => r.username)
                    .join(" ,")}
                />
                <ListItemSecondaryAction>
                  time
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
}

export default Conversation;
