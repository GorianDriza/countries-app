import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getCountriesList } from '../api/countries';
import Loader from '../../components/loader';
import styles from './Countries.module.scss'

export default function Countries(props) {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [loader, setLoader] = useState(false);

  // handle change of title
  useEffect(() => {
    props.title('Countries List');
    getListOfCountries();
  }, []);

  const getListOfCountries = () => {
    getCountriesList().then((response) => {
      if (response && response.length > 0) setCountries(response);
      setTimeout(() => {
        setLoader(true);
      }, 2000)
    })
  }

  const goToCountryDetails = (code) => {
    router.push({
      pathname: '/country',
      query: { code: code },
    })
  }

  return (
    <div className={styles.main}>
      {loader ? null : <Loader />}
      {loader &&
        <div>
          <h2 className={styles.title}>Countries App</h2>
          <ul className={styles.cardList}>
            {
              (countries && countries.length > 0) ?
                countries.map((country) => {
                  return (
                    <li key={country.cca2} className={styles.card}
                      onClick={() => goToCountryDetails(country.cca2)}>
                      <span className={styles.name}>{country.name.common}</span>
                      <div className={styles.cardDetails}>
                        <div className={styles.imageBlock}>
                          <div>
                            <img className={styles.cardImage} src={country.flags.svg} alt={country.name.common} />
                            <span>Flag</span>
                          </div>
                          <div>
                            <img className={styles.cardImage} src={country.coatOfArms.svg ? country.coatOfArms.svg : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'} alt={country.name.common} />
                            <span>National emblem</span>
                          </div>
                        </div>
                        <div className={styles.detailBlock}>
                          <p><b>Name:</b> {country.name.common}</p>
                          <p><b>Capital:</b> {country.capital ? country.capital : 'No Capital Found'}</p>
                          <p><b>Population:</b> {country.population > 0 ? country.population.toLocaleString() : 'No Population Found'}</p>
                        </div>
                      </div>
                    </li>
                  )
                })
                : 'Nuk u gjend'
            }
          </ul>
        </div>
      }
    </div>
  )
}
