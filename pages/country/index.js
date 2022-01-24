import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { getCountryDetails, getCountriesList } from '../api/countries';
import Loader from '../../components/loader';
import SmallLoader from '../../components/small-loader';
import Image from 'next/image';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import styles from './CountryDetails.module.scss'

export default function Country(props) {
  const router = useRouter();
  const [country, setCountry] = useState({});
  const [borders, setBorders] = useState([]);
  const [loader, setLoader] = useState(false);
  const [smallLoader, setSmallLoader] = useState(false);

  const { code } = router.query;

  // handle change of title
  useEffect(() => {
    if (code) getCountry(code);
  }, [router.query]);

  // border
  useEffect(() => {
    getBordersDetails(country.borders);
  }, [country]);

  const getCountry = (code) => {
    getCountryDetails(code).then((response) => {
      if (response && response.length > 0) {
        setCountry(response[0]);
        props.title(response[0].name.common);
      }

      setTimeout(() => {
        setLoader(true);
      }, 1000);

    }).catch((err) => {
      setTimeout(() => {
        setLoader(true);
      }, 1000);
    })
  }

  const goBack = () => {
    router.push({
      pathname: '/countries'
    })
  }

  const renderCurrencies = (currencies) => {
    let currencyString = '';
    if (!currencies) return 'No currency found';

    Object.keys(currencies).forEach((currency, index) => {
      currencyString += currencies[currency].symbol + ' (' + currencies[currency].name + ') ' + ((Object.keys(currencies).length - 1) !== index ? ' &#183; ' : '');;
    });

    return currencyString;
  }

  const renderLanguages = (languages) => {
    let languageString = '';
    if (!languages) return 'No languages found';

    Object.keys(languages).forEach((language, index) => {
      languageString += languages[language] + ((Object.keys(languages).length - 1) !== index ? ' &#183; ' : '');
    });

    return languageString;
  }

  const getBordersDetails = (borderCode) => {

    if (borderCode && borderCode.length > 0) {
      getCountriesList().then((response) => {
        if (response && response.length > 0) {
          const bordersArray = response.filter((country) => borderCode.includes(country.cca3));
          setBorders(bordersArray);
        }
        setSmallLoader(true);
      });
    } else {
      setSmallLoader(true);
    }
  }

  const goToCountry = (code) => {
    setSmallLoader(false);
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
          </h2>
          <button className={styles.button} onClick={() => goBack()}>
            <div>
              <AiOutlineArrowLeft />
            </div>
            <span>BACK</span>
          </button>
          <div className={styles.countryDetails}>
            <div className={styles.imageBlocks}>
              <div>
                <Image
                  src={country.flags.svg}
                  alt={country.name.common}
                  className={styles.image}
                  width={200}
                  height={200}
                  objectFit="contain"
                  quality={100}
                />
                <p>Flag</p>
              </div>
              <div>
                <Image
                  src={country.coatOfArms.svg ? country.coatOfArms.svg : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'}
                  alt={country.name.common}
                  className={styles.image}
                  width={200}
                  height={200}
                  objectFit="contain"
                  quality={100}
                />
                <p>National emblem</p>
              </div>
            </div>
            <div className={styles.details}>
              <p>
                <b>Name: </b> {country.name.common}
              </p>
              <p>
                <b>Capital: </b> {country.capital ? country.capital : 'No Capital found'}
              </p>
              <p>
                <b>Currency: </b> <span dangerouslySetInnerHTML={{ __html: renderCurrencies(country.currencies) }}></span>
              </p>
              <p>
                <b>Population: </b> {country.population > 0 ? country.population.toLocaleString() : 'No Population Found'}
              </p>
              <p>
                <b>Languages: </b> <span dangerouslySetInnerHTML={{ __html: renderLanguages(country.languages) }}></span>
              </p>
            </div>
          </div>
          <div className={styles.bordersBlock}>
            <h4>Bordering Countries</h4>
            <div>
              {smallLoader ?
                borders.length > 0 ?
                  borders.map((country) => {
                    return (
                      <div key={country.cca2} className={styles.border} onClick={() => goToCountry(country.cca2)}>
                        <div>
                          <Image
                            src={country.flags.svg}
                            alt={country.name.common}
                            className={styles.image}
                            width={70}
                            height={70}
                            objectFit="contain"
                            quality={100}
                          />
                        </div>
                        <div className={styles.borderDetails}>
                          <p><b>Name:</b> {country.name.common}</p>
                          <p><b>Capital:</b> {country.capital ? country.capital : 'No Capital Found'}</p>
                          <p><b>Population:</b> {country.population > 0 ? country.population.toLocaleString() : 'No Population Found'}</p>
                        </div>
                      </div>
                    )
                  })
                  : 'No borders found'
                : <SmallLoader />}
            </div>
          </div>
        </div>
      }
    </div>
  )
}
