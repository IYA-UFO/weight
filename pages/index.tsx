import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'dayjs/locale/ja';
import Main from 'components/Main';
import useInitApp from 'hooks/initApp';
import useFetchPastWeights from 'hooks/fetchPastWeights';

const Home = () => {
  useInitApp();
  useFetchPastWeights();

  return <Main />;
};

export default Home;
