import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import MonthSelector from '../components/MonthSelector';
import DayGrid from '../components/DayGrid';

export default function Home() {
  return (
    <div className={styles.container}>
      <MonthSelector month="May" />
      <DayGrid year="2022" month="May" />
    </div>
  );
}
