import React, { useState } from "react";
import "./Contact.css";
import { useContacts } from "../contexts/ContactsContext";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

function Contact() {
  const { contacts, hanldeSelectContact } = useContacts();
  const [selectedIndex, setSelectedIndex] = useState();

  function handleSelectContact(contact, index) {
    setSelectedIndex(index);
    hanldeSelectContact(contact);
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
  }));

  const classes = useStyles();

  return (
    <List dense disablePadding className={classes.root}>
      {contacts.map((contact, index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <ListItem
            divider
            key={index}
            button
            selected={selectedIndex === index}
            onClick={() => handleSelectContact(contact, index)}
          >
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${index + 1}`}
                // src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={contact.username} />
          </ListItem>
        );
      })}
    </List>
  );

  // </div>
}

export default Contact;
