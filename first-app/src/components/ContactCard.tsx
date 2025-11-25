import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import "./ContactCard.css";

const ContactCard: React.FC = () => {
  const { selectedContact } = useSelector((state: RootState) => state.contact);

  if (!selectedContact) return null;

  return (
    <div className="card shadow-lg border-0 rounded-4 sticky-top">
      <div className="card-header bg-primary text-white p-4 rounded-top-4">
        <h5 className="mb-0 text-center">Contact Details</h5>
      </div>

      <div className="card-body text-center pt-5">
        <img
          src={selectedContact.picture.large}
          alt=""
          className="rounded-circle contact-img img-thumbnail"
        />

        <ul className="list-group mt-3">
          <li className="list-group-item">
            <strong>Name:</strong> {selectedContact.name.first}{" "}
            {selectedContact.name.last}
          </li>
          <li className="list-group-item">{selectedContact.email}</li>
          <li className="list-group-item">
            <strong>Age:</strong> {selectedContact.dob.age} yrs
          </li>
          <li className="list-group-item">
            <strong>City:</strong> {selectedContact.location.city}
          </li>
          <li className="list-group-item">
            <strong>State:</strong> {selectedContact.location.state}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactCard;
