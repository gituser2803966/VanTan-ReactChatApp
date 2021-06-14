import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { useAuth } from "../contexts/AuthProvider";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversation } from "../contexts/ConversationsProvider";
import { useSocket } from "../contexts/SocketProvider";
import { Typography } from "@material-ui/core";

function NewConversationDialog(props) {
  const { onClose, open } = props;
  const {
    authState: { user },
  } = useAuth();
  const { contacts } = useContacts();
  const { createConversation } = useConversation();
  const socket = useSocket();

  const [checked, setChecked] = useState([]);
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [conversationName, setConversationName] = useState("");
  const [error, setError] = useState("");

  //
  const handleCheckBoxChange = (contactId, index) => () => {
    const currentIndex = checked.indexOf(index);
    console.log("currentIndex: ", currentIndex);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);

    setSelectedContactIds((prevSelectedContactIds) => {
      // nếu contactId hiện tại đã đc chọn rồi => loai bo cai contact id hien tai ra = ham filter
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return prevId !== contactId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  };
  // handle click create conversation
  const handleSubmit = (e) => {
    e.preventDefault();
    if (conversationName == "") {
      setError("vui lòng nhập vào tên");
      return;
    }
    // @params
    // name: String
    // participants: [] ,
    // createdBy: String
    // createAt: Date
    // updatedAt: Date
    // deletedAt: Date
    //  messages: [Default = null]
    let conversationData = {
      name: conversationName,
      participants: selectedContactIds.concat(user._id),
      createdBy: user._id,
      // createAt: new Date().toLocaleString(),
      messages: [],
    };

    createConversation(conversationData)
      .then((response) => {
        // gởi lên server cuộc trò chuyện mới vừa tạo thành công
        const newConversation = response.data.conversation;
        socket.emit("create new conversation", newConversation);
        setError("");
        setConversationName("");
        onClose();
      })
      .catch((error) => {
        setError("");
        setConversationName("");
        onClose();
      });
  };

  const useStyles = makeStyles((theme) => ({
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    box: {
      padding: 5,
    },
    list__item: {
      display: "flex",
      justifyContent: "center",
    },
    createConversationButton: {
      padding: 8,
      background: "#1976d2",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#1976d2",
      },
    },
    textError: {
      color: "red",
    },
  }));

  const classes = useStyles();

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title" disableTypography={true}>
        Tạo Cuộc trò chuyện mới
      </DialogTitle>
      <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
        <div>
          <TextField
            id="standard-textarea"
            label="tên cuộc trò chuyện"
            placeholder="tên cuộc trò chuyện"
            multiline
            onChange={(e) => setConversationName(e.target.value)}
          />
          {/* show error if input empty */}
          <Typography variant="body2" className={classes.textError}>
            {error ? error : ""}
          </Typography>
          {/* end show error if input empty */}
        </div>
        <List dense>
          {/* show all contact */}
          {contacts ? (
            contacts.map((contact, index) => {
              const labelId = `checkbox-list-secondary-label-${index}`;
              return (
                <ListItem key={index} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${index + 1}`}
                      src={`/static/images/avatar/${index + 1}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={contact.email} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={handleCheckBoxChange(contact._id, index)}
                      checked={selectedContactIds.includes(contact._id)}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
          ) : (
            <h4>Loading ...</h4>
          )}
          {/* end show all contact */}
        </List>
        {/* show create conversation Button */}
        <Box p={1}>
          <Button
            fullWidth
            type="submit"
            className={classes.createConversationButton}
            variant="contained"
            size="medium"
            disabled={selectedContactIds.length > 0 ? false : true}
          >
            tạo cuộc trò chuyện
          </Button>
        </Box>
        {/* end show craete conversation Button */}
      </form>
    </Dialog>
  );
}

// OpenConversationDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

export default NewConversationDialog;
