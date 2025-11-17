import card1 from "../../assets/img/card_1.jpg";
import card2 from "../../assets/img/card_2.jpg";
import card3 from "../../assets/img/card_3.jpg";
import card4 from "../../assets/img/card_4.jpg";

const cards = [
  { img: card1, title: "Paris" },
  { img: card2, title: "Bangkok" },
  { img: card3, title: "Indonesia" },
  { img: card4, title: "Malaysia" },
];

const Card = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        {cards.map((item, index) => (
          <div className="col-md-3" key={index}>
            <div className="card">
              <img src={item.img} alt={item.title} />
              <div className="card-body">
                <p className="h3">{item.title}</p>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Corporis deserunt dicta facilis, impedit ipsa mollitia nobis
                  praesentium voluptatem? Excepturi, rem.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
