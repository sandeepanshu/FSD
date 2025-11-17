interface ICardProps {
  img: string;
  title: string;
}

const Card = ({ img, title }: ICardProps) => {
  return (
    <div className="card">
      <img src={img} alt={title} className="img-fluid" />
      <div className="card-body">
        <h2>{title}</h2>
        <p className="card-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Accusantium architecto dolore ea excepturi laudantium magni nisi
          nobis officia perferendis repellendus.
        </p>
      </div>
    </div>
  );
};

export default Card;
