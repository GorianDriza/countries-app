import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/Home.module.scss';

export default function Home(props) {
  const router = useRouter();

  // handle change of title
  useEffect(() => {
    props.title('Welcome to Countries App');
  }, [])

  const goToCountries = () => {
    router.push('/countries');
  }

  return (
    <div className={styles.homepage}>

      <h1 className={styles.title}>Welcome To Countries App</h1>
      <p className={styles.subtitle}>Here you can find all the details of a country</p>

      <button id="goToCountries" className={styles.goTo} onClick={() => goToCountries()}>
        <span>Go to countries</span>
        <div className={styles.loading}>
          <div className={styles.arrow}></div>
        </div>
      </button>
    </div>
  )
}
