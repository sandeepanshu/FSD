const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="bg-dark text-white text-center p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4">React Concepts</p>
              <p>Copyright &copy; {year}</p>
              <small>All Rights Reserved</small>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
