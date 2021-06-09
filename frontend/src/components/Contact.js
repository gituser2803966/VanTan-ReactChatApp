import React, { useState } from "react";
import "./Contact.css";
import { useContacts } from "../contexts/ContactsProvider";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthProvider";
import { useUsersOnline } from '../contexts/UsersOnlineProvider';

function Contact() {
  const { contacts } = useContacts();
  const { usersOnline } = useUsersOnline();
  console.log('usersOnline in Contact.js file: ',usersOnline)
  const {
    authState: { user },
  } = useAuth();

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
  }));

  const classes = useStyles();

  return (
    <div className="contact__container">
      {contacts?contacts.map((contact, index) => {
        const userOnline = usersOnline.find(u=>u._id === contact._id);
        return (
          <div className="contact__list" key={index}>
            <div className="contact__icon">
              <img
                className="contact__image"
                src="https://cdn2.iconfinder.com/data/icons/flatfaces-everyday-people-square/128/beard_male_man_face_avatar-512.png"
              />
               {
                userOnline && userOnline.status === true ?  
                <div className="online__status__circle"></div>
                 :
                <div className="offline__status__circle"></div>
              } 
            </div>
            <div className="contact__username">
              <span>{contact.firstName+" "+contact.lastName}</span>
            </div>
          </div>
        );
      }) :
        <h4>No contact found</h4>
      }
    </div>
  );
}

export default Contact;
