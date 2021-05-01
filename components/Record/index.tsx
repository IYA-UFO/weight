import { useContext } from 'react';
import styled from 'styled-components';
import { DataContext } from 'context/DataContextProvider';

const Record = () => {
  const { hasFirebaseUser, pastWeight } = useContext(DataContext);

  return (
    <Wrap>
      {hasFirebaseUser === null ? (
        <PleaseLogin>ログインしてください</PleaseLogin>
      ) : (
        <>
          {pastWeight.weeks.map((week) => (
            <Week key={week.weekId}>
              <WeekHead>
                <span>
                  {week.weekId} {week.firstDay}-
                </span>
                <span>
                  {(Math.round(week.averageWeight * 10) / 10).toFixed(1)}kg
                </span>
              </WeekHead>
              {week.records.map((record, index) => (
                <WeekDays key={index}>
                  <span>{record.date.format('MM/DD')}</span>
                  <span>{record.weight.toFixed(1)}kg</span>
                </WeekDays>
              ))}
            </Week>
          ))}
        </>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 20px 20px;
  flex-grow: 1;
  height: calc(100% - 66px);
  overflow-y: scroll;
`;
const PleaseLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  height: calc(100% - 50px);
`;

const Week = styled.div``;

const WeekHead = styled.h2`
  font-size: 15px;
  line-height: 1;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const WeekDays = styled.p`
  line-height: 1;
  font-size: 12px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
`;

export default Record;
