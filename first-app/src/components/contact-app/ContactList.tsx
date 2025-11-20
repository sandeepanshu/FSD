import { useEffect, useState } from "react";
import axios from "axios";
import type { IContact } from "./models/IContact";

interface IProps {
  sendContact: (contact: IContact) => void;
}

const ContactList: React.FC<IProps> = ({ sendContact }) => {
  const [contacts, setContacts] = useState<IContact[]>([]);

  useEffect(() => {
    const dataURL =
      "https://gist.githubusercontent.com/thenaveensaggam/270f3990f36d1c1ad71cab4f06c8e67b/raw/77e0eb4c3d2cbafe88901006dac4e8daf2705f82/contacts.04022021.json";

    axios
      .get<IContact[]>(dataURL)
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Runs once like componentDidMount

  const selectContact = (contact: IContact) => {
    sendContact(contact);
  };

  return (
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
        {contacts.length > 0 &&
          contacts.map((contact) => (
            <tr
              key={contact.login.uuid}
              onClick={() => selectContact(contact)}
              style={{ cursor: "pointer" }}
            >
              <td>
                {contact.login.uuid.substr(
                  contact.login.uuid.length - 5
                )}
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
  );
};

export default ContactList;
