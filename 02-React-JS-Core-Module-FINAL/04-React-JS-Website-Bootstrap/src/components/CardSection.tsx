import Card from "./card/Card";
import card1 from "../assets/img/card_1.jpg";
import card2 from "../assets/img/card_2.jpg";
import card3 from "../assets/img/card_3.jpg";
import card4 from "../assets/img/card_4.jpg";

const CardSection = () => {
  return (
    <>
      <section className="p-3 m-3">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Card img={card1} title="Paris" />
            </div>
            <div className="col-md-3">
              <Card img={card2} title="Bangkok" />
            </div>
            <div className="col-md-3">
              <Card img={card3} title="Indonesia" />
            </div>
            <div className="col-md-3">
              <Card img={card4} title="Malaysia" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CardSection;
