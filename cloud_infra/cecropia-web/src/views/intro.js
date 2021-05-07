import "./css/frontpage.css";

import Container from "react-bootstrap/Container"

function Intro() {
  return (
    <div className="App-header">
      <Container style={{height: "100vh", maxWidth: "100%", paddingTop: "30px"}}>
        <iframe
          width="90%"
          height="90%"
          src="https://www.youtube.com/embed/foiRTJnc-vA?controls=0"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </Container>
    </div>
  );
}

export default Intro;
