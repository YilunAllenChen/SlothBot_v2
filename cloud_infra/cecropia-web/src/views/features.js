import logo from "./star_sloth.png";
import "./css/frontpage.css";

function Features() {
  return (
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <br></br>
      <p>Features of...</p>
      <a
        className="App-link"
        href="https://www.youtube.com/watch?v=foiRTJnc-vAg"
        target="_blank"
        rel="noopener noreferrer"
      >
        The SlothBot Project!
      </a>
    </div>
  );
}

export default Features;
