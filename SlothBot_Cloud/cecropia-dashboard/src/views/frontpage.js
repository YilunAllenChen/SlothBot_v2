import logo from "./media/cecropia.png";

function FrontPage() {
  return (
    <div className="App-header">
      <img src={logo} style={{width: "50vh"}} alt="logo" />
      <br></br>
      <p>
        Cecropia is the cloud-based data platform behind...
        <a
          className="App-link"
          href="https://www.youtube.com/watch?v=foiRTJnc-vAg"
          target="_blank"
          rel="noopener noreferrer"
        >
          The SlothBot Project!
        </a>
      </p>
    </div>
  );
}

export default FrontPage;
