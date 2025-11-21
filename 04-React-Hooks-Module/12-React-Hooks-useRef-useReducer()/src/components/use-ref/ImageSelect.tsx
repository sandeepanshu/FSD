import React, { useRef } from "react";
import card1 from "../../assets/img/card_1.jpg";

const ImageSelect: React.FC = () => {
  const imageEl = useRef<HTMLImageElement>(null);

  const clickButton = () => {
    if (imageEl.current) {
      alert(imageEl.current);
      console.log(
        "Image dimensions:",
        imageEl.current.width,
        imageEl.current.height
      );
      console.log("Image src:", imageEl.current.src);
    }
  };

  return (
    <section className="mt-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img
                ref={imageEl}
                src={card1}
                alt="Card visual"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">Card Title</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquam animi commodi consectetur consequatur deserunt
                  distinctio enim est facere in, incidunt itaque magni,
                  necessitatibus provident quibusdam sit, suscipit tempora ullam
                  ut.
                </p>
                <button
                  onClick={clickButton}
                  className="btn btn-success btn-sm"
                  data-mdb-ripple-init
                >
                  Click
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSelect;
