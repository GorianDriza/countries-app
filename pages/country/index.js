import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getCountryDetails } from '../api/countries';
import Loader from '../../components/loader';
import styles from './CountryDetails.module.scss'

export default function Country(props) {
  const router = useRouter();
  const [country, setCountry] = useState([]);
  const [loader, setLoader] = useState(false);

  const { code } = router.query

  // handle change of title
  useEffect(() => {
    getCountry(code);
  }, []);

  const getCountry = (code) => {
    getCountryDetails(code).then((response) => {
      if (response && response.length > 0) {
        setCountry(response);
        props.title(response[0].name.common);
        setTimeout(() => {
          setLoader(true);
        }, 2000)
      }
    })
  }

  return (
    <div className={styles.main}>
      {loader ? null : <Loader />}
      {loader && 
        <div>aaa</div>
      }
    </div>
  )
}
