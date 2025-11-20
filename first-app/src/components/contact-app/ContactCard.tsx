import React from "react";
import type { IContact } from "./models/IContact";
import "./ContactCard.css";

interface IProps {
  selectedContact: IContact;
}

const ContactCard: React.FC<IProps> = ({ selectedContact }) => {
  return (
    <div className="card sticky-top">
      <div className="card-header bg-primary text-white p-5"></div>

      <div className="card-body text-center">
        <img
          src={selectedContact.picture.large}
          alt=""
          className="rounded-circle contact-img img-thumbnail"
        />

        <ul className="list-group">
          <li className="list-group-item">
            NAME : {selectedContact.name.first} {selectedContact.name.last}
          </li>
          <li className="list-group-item">{selectedContact.email}</li>
          <li className="list-group-item">
            AGE : {selectedContact.dob.age} yrs
          </li>
          <li className="list-group-item">
            City : {selectedContact.location.city}
          </li>
          <li className="list-group-item">
            State : {selectedContact.location.state}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactCard;
