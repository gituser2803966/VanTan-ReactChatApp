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
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { useContacts } from "../contexts/ContactsProvider";
import { useConversation } from "../contexts/ConversationsProvider";

function NewConversationDialog(props) {
  const { onClose, selectedValue, open } = props;

  const { contacts } = useContacts();
  const { createConversation } = useConversation();
  const [checked, setChecked] = useState([]);
  const [selectedContactIds, setSelectedContactIds] = useState([]);

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

  // close modal
  const handleClose = () => {
    onClose(selectedValue);
  };

  // handle click add conversation
  const handleListItemClick = (value) => {
    //
    createConversation(selectedContactIds);
    onClose(value);
  };

  const useStyles = makeStyles((theme) => ({
    box: {
      padding: 5,
    },
    list__item: {
      display: "flex",
      justifyContent: "center",
    },
    create__btn: {
      padding: 8,
      background: "#1976d2",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#1976d2",
      },
    },
  }));

  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Cuộc trò chuyện mới</DialogTitle>
      <List dense className={classes.root}>
          {
            contacts ?
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
            :
            <h4>No contact found...</h4>
          }
        <ListItem
          className={classes.list__item}
          // autoFocus
          button
          onClick={() => handleListItemClick()}
        >
          {/* <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar> */}
          <Box
            display={selectedContactIds.length > 0 ? "flex" : "none"}
            className={classes.box}
            displayPrint="block"
          >
            <Button
              fullWidth
              className={classes.create__btn}
              variant="contained"
              size="small"
              // disabled={true}
              // color="primary"
            >
              tạo cuộc trò chuyện
            </Button>
          </Box>
        </ListItem>
      </List>
    </Dialog>
  );
}

// OpenConversationDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

export default NewConversationDialog;
