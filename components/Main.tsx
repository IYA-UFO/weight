import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'dayjs/locale/ja';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import WeightInputArea from 'components/InputArea';
import Graph from 'components/Graph';
import Header from 'components/Header';
import { UserContext } from 'pages/index';

const Main = () => {
  const { user, setUser } = useContext(UserContext);
  const [innerHeight, setInnerHeight] = useState(0);
  useEffect(() => {
    setInnerHeight(window.innerHeight);
  }, []);
  return (
    <Wrap innerHeight={innerHeight}>
      <Header />
      <Graph />
      <WeightInputArea />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${({ innerHeight }) => `${innerHeight}px`};
  padding-bottom: 20px;
`;

export default Main;
