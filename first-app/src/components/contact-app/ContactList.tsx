import React, { useEffect, useState } from "react";
import type { IContact } from "./models/IContact";
import axios from "axios";

interface IProps {
  sendContact: (contact: IContact) => void;
}
interface IState {
  contacts: IContact[];
}

const ContactList: React.FC<IProps> = ({ sendContact }) => {
  const [contactState, setContactState] = useState<IState>({
    contacts: [] as IContact[],
  });

  useEffect(() => {
    const dataURL: string =
      "https://gist.githubusercontent.com/sandeepanshu/59eeb1e6ff9be4f516e36343f5389c8d/raw/a86ebf189a3cd978a3707ed54c73d0f921ff13c1/gistfile1.json";
    axios
      .get(dataURL)
      .then((response) => {
        setContactState({
          contacts: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const selectContact = (contact: IContact): void => {
    sendContact(contact);
  };

  const { contacts } = contactState;
  return (
    <>
      <table className="table table-hover text-center table-striped">
        <thead className="bg-primary text-white">
          <tr>
            <th>SNO</th>
            <th>NAME</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr
              key={contact.login.uuid}
              onClick={() => selectContact(contact)}   // ✅ FIXED
              style={{ cursor: "pointer" }}
            >
              <td>
                {contact.login.uuid.substr(contact.login.uuid.length - 5)}
              </td>
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
    </>
  );
};

export default ContactList;
