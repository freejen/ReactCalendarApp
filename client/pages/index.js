import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import MonthSelector from '../components/MonthSelector';
import DayGrid from '../components/DayGrid';

import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';

export default function Home() {
  return (
    <>
      <Container>
        <Stack gap={5} className="mt-5">
          <MonthSelector month="May" />
          <DayGrid year="2022" month="May" />
        </Stack>
      </Container>
    </>
  );
}
