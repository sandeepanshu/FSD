import spinnerImage from "../../assets/img/spinner.gif";

const Spinner: React.FC = () => {
  return (
    <div className="text-center my-3">
      <img src={spinnerImage} alt="Loading..." className="d-block m-auto" />
    </div>
  );
};

export default Spinner;
