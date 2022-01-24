import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getCountriesList, getCountryByName } from '../api/countries';
import Loader from '../../components/loader';
import Image from 'next/image';
import { BsSearch } from 'react-icons/bs';
import styles from './Countries.module.scss'

export default function Countries(props) {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState('');


  // handle change of title
  useEffect(() => {
    props.title('Countries List');
    getListOfCountries();

    return () => { setCountries([]) }
  }, []);

  const getListOfCountries = () => {
    getCountriesList().then((response) => {
      if (response && response.length > 0) setCountries(response);

      setTimeout(() => {
        setLoader(true);
      }, 1000)
    })
  }

  const goToCountryDetails = (code) => {
    router.push({
      pathname: '/country',
      query: { code: code },
    })
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') searchForContry();
  }

  const searchForContry = () => {
    if (search === '') {
      getCountriesList().then((response) => {
        if (response && response.length > 0) setCountries(response);
      })
    } else {
      getCountryByName(search).then((response) => {
        if (response && response.length > 0) setCountries(response);
      })
    }
  }

  return (
    <div className={styles.main}>
      {loader ? null : <Loader />}
      {loader &&
        <div>
          <h2 className={styles.title}>
            <Image
              src="/icons8-country-64.png"
              alt="Logo"
              width={50}
              height={50}
              objectFit="contain"
              quality={100}
            />
            <span className={styles.span}>Countries App</span>
            <div className={styles.filters}>
              <input
                className={styles.input}
                placeholder='Search Contry'
                type="text"
                onChange={(event) => setSearch(event.target.value)}
                onKeyPress={(event) => handleKeyPress(event)}
              />
              <button className={styles.button} onClick={() => searchForContry()}><BsSearch /></button>
            </div>
          </h2>
          <ul className={styles.cardList}>
            {
              (countries && countries.length > 0) ?
                countries.map((country) => {
                  return (
                    <li key={country.cca2} className={styles.card} id={country.cca2}
                      onClick={() => goToCountryDetails(country.cca2)}>
                      <span className={styles.name}>{country.name.common}</span>
                      <div className={styles.cardDetails}>
                        <div className={styles.imageBlock}>
                          <div>
                            <Image
                              src={country.flags.svg}
                              alt={country.name.common}
                              className={styles.cardImage}
                              width={100}
                              height={100}
                              objectFit="contain"
                              quality={100}
                            />
                            <p>Flag</p>
                          </div>
                          <div>
                            <Image
                              src={country.coatOfArms.svg ? country.coatOfArms.svg : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'}
                              alt={country.name.common}
                              className={styles.cardImage}
                              width={100}
                              height={100}
                              objectFit="contain"
                              quality={100}
                            />
                            <p>National emblem</p>
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
                : 'Something went wrong'
            }
          </ul>
        </div>
      }
    </div>
  )
}
