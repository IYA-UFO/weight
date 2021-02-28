import { useContext, useEffect, useState } from 'react';
import useFetchPastWeights from 'hooks/fetchPastWeights';

import styled from 'styled-components';
import { UserContext } from 'pages/index';

import Controller from 'components/Controller';
import Home from './Home';
import Account from './Account';
import Record from './Record';

const Main = () => {
  const { view } = useContext(UserContext);
  const [innerHeight, setInnerHeight] = useState(0);
  useEffect(() => {
    setInnerHeight(window.innerHeight);
  }, []);
  const data = useFetchPastWeights();

  return (
    <Wrap innerHeight={innerHeight}>
      {view === 'home' && <Home data={data} />}
      {view === 'account' && <Account />}
      {view === 'record' && <Record data={data} />}
      <Controller />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${({ innerHeight }) => `${innerHeight}px`};
`;

export default Main;
