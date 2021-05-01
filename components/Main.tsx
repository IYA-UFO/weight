import { useContext } from 'react';
import styled from 'styled-components';
import Controller from 'components/Controller';
import { DataContext } from 'context/DataContextProvider';
import Home from './Home';
import Account from './Account';
import Record from './Record';

const Main = () => {
  const { windowSize, currentView } = useContext(DataContext);
  return (
    <Wrap windowSize={windowSize}>
      {currentView === 'home' && <Home />}
      {currentView === 'account' && <Account />}
      {currentView === 'record' && <Record />}
      <Controller />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${({ windowSize }) =>
    windowSize ? `${windowSize.height}px` : '100%'};
  width: ${({ windowSize }) => (windowSize ? `${windowSize.width}px` : '100%')};
  margin: 0 auto;
`;

export default Main;
