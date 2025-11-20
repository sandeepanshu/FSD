import { useState } from "react";
import ContactList from "./ContactList";
import ContactCard from "./ContactCard";
import type { IContact } from "./models/IContact";

const ContactApp: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<IContact>(
    {} as IContact
  );

  const receiveContact = (contact: IContact) => {
    setSelectedContact(contact);
  };

  return (
    <>
      {/* <pre>{JSON.stringify(selectedContact)}</pre> */}

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
            <div className="col-md-9">
              {/* sendContact function passed to ContactList */}
              <ContactList sendContact={receiveContact} />
            </div>

            <div className="col-md-3">
              {/* Show ContactCard only when selectedContact has data */}
              {Object.keys(selectedContact).length > 0 && (
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
