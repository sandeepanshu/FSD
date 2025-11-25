import React from "react";
import ContactList from "./ContactList";
import ContactCard from "./ContactCard";

const ContactApp: React.FC = () => {
  return (
    <>
      <section className="py-4 bg-light border-bottom">
        <div className="container text-center">
          <h2 className="fw-bold text-primary">📇 Contact Manager</h2>
          <p className="text-muted">Browse and select contacts using Redux Toolkit.</p>
        </div>
      </section>

      <section className="py-4">
        <div className="container">
          <div className="row g-4">
            
            {/* Contact List */}
            <div className="col-md-8">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-header bg-primary text-white rounded-top-4">
                  <h5 className="mb-0">All Contacts</h5>
                </div>
                <div className="card-body">
                  <ContactList />
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="col-md-4">
              <ContactCard />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ContactApp;
