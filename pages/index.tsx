import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'dayjs/locale/ja';
import GlobalStyles from '../styles/global';
import React, { useState } from 'react';
import Main from 'components/Main';
import useInitApp from 'hooks/initApp';

export const UserContext = React.createContext(null);

const Home = () => {
  const [user, setUser] = useState(undefined);
  const [view, setView] = useState('home');
  useInitApp(setUser);
  return (
    <>
      <GlobalStyles />
      <UserContext.Provider
        value={{
          user,
          setUser,
          view,
          setView,
        }}
      >
        <Main />
      </UserContext.Provider>
    </>
  );
};

export default Home;
