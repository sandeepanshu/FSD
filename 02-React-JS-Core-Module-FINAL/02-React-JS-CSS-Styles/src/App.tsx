import "./App.css";
import Message from "./components/message/Message";

function App() {
  return (
    <>
      <nav className="navbar">
        <a href="/">React with CSS Styles</a>
      </nav>
      <div>
        <Message msg="Good Morning" />
        <Message msg="Good Evening" />
        <Message msg="Good Afternoon" />
      </div>
    </>
  );
}

export default App;
