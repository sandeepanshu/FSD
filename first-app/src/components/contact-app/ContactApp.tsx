import React, { useState } from "react";
import ContactList from "./ContactList";
import ContactCard from "./ContactCard";
import type { IContact } from "./models/IContact";

const ContactApp: React.FC = () => {
  // null = no contact selected yet
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);

  const receiveContact = (contact: IContact): void => {
    setSelectedContact(contact);
  };

  return (
    <>
      {/* Debug */}
      {/* <pre>{JSON.stringify(selectedContact, null, 2)}</pre> */}

      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-primary">Contact App</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                aspernatur aut commodi cumque ex illo magni natus nesciunt nobis
                odio officia officiis reiciendis rerum sapiente suscipit
                tenetur, ut velit voluptate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            {/* Contact List */}
            <div className="col-md-9">
              <ContactList sendContact={receiveContact} />
            </div>

            {/* Contact Card */}
            <div className="col-md-3">
              {selectedContact && (
                <ContactCard selectedContact={selectedContact} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactApp;
