import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  selectContactInfo,
} from "../redux/contact-app/contact-app.slice";
import Spinner from "./layout/Spinner";
import type { AppDispatch, RootState } from "../redux/store";
import type { IContact } from "./models/IContact";

const ContactList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, loading } = useSelector(
    (state: RootState) => state.contact
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const selectContact = (contact: IContact) => {
    dispatch(selectContactInfo(contact));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <table className="table table-hover text-center table-striped shadow-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th>SNO</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((contact) => (
              <tr
                key={contact.login.uuid}
                onClick={() => selectContact(contact)}
                style={{ cursor: "pointer" }}
                className="align-middle"
              >
                <td>{contact.login.uuid.slice(-5)}</td>
                <td>
                  {contact.name.first} {contact.name.last}
                </td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.location.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ContactList;
