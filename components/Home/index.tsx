import { useContext } from 'react';
import styled from 'styled-components';
import WeightInputArea from './InputArea';
import Graph from './Graph';

import { UserContext } from 'pages/index';

const Main = ({ data }) => {
  const { user } = useContext(UserContext);

  return (
    <Wrap>
      {user === null ? (
        <PleaseLogin>ログインしてください</PleaseLogin>
      ) : (
        <>
          <Graph data={data} />
          <WeightInputArea />
        </>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 0;
  flex-grow: 1;
`;
const PleaseLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  height: calc(100% - 50px);
`;

export default Main;
