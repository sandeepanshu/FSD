import "./Message.css";

interface MessageProps {
  msg: string;
}

const Message: React.FC<MessageProps> = ({ msg }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h2>{msg}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
          consequatur dolor, ex explicabo minima nesciunt omnis perspiciatis
          possimus quo ratione sunt, tempore. Accusantium adipisci fugiat
          harum necessitatibus quasi tempore temporibus.
        </p>
      </div>
    </div>
  );
};

export default Message;
