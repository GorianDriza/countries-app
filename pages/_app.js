import { useState } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [title, setTitle] = useState('');

  // handle change of title
  const getTitle = (value) => {
    setTitle(value);
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={title} key="title" />
      </Head>
      <Component {...pageProps} title={getTitle} />
    </>
  )
}

export default MyApp
