import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import NewConversationDialog from "./NewConversationDialog";
import { useConversation } from "../contexts/ConversationContext";

const emails = ["username@gmail.com", "user02@gmail.com"];

function Conversation() {
  const { conversations, selectConversationIndex } = useConversation();

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    selectedListItem: {
      "&$selected": {
        backgroundColor: "#4791db",
        "&:hover": {
          backgroundColor: "#64b5f6",
        },
      },
    },
    selected: {},
    headerConversations: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <div className={classes.headerConversations}>
        <NewConversationDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
        <Typography>Cuộc trò chuyện</Typography>
        <Box component="div">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            New Chat
          </Button>
        </Box>
      </div>
      <div>
        <List dense className={classes.root}>
          {conversations.map((conversation, index) => {
            const labelId = `checkbox-list-secondary-label-${index}`;
            return (
              <ListItem
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
                  {/* <Checkbox
                edge="end"
                onChange={handleToggle(index)}
                checked={checked.indexOf(index) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              /> */}
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
