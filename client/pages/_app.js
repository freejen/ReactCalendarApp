import '../styles/reset.css';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="http://localhost:3000/">Home</Navbar.Brand>
        </Container>
      </Navbar>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
