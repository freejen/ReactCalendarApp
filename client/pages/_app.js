import '../styles/reset.css';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand
            onClick={() => {
              router.push('/');
            }}
            style={{ cursor: 'pointer' }}
          >
            Calendar
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
