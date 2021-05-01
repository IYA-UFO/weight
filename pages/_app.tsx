import DataContextProvider from 'context/DataContextProvider';
import GlobalStyles from '../styles/global';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />
      <DataContextProvider>
        <Component {...pageProps} />
      </DataContextProvider>
    </>
  );
};

export default MyApp;
