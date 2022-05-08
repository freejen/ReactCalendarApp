import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MonthSelector from "../components/MonthSelector"

export default function Home() {
  return (
    <div className={styles.container}>
      <MonthSelector month="May"/>
    </div>
  )
}
