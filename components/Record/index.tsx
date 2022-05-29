import { useContext, useState } from 'react';
import styled from 'styled-components';
import { DataContext } from 'context/DataContextProvider';
import Modal from './Modal';

const Record = () => {
  const { hasFirebaseUser, pastWeight } = useContext(DataContext);
  const [isModalShow, setIsModalShow] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const handleDayClick = (record) => {
    setIsModalShow(true);
    setSelectedRecord(record);
  };
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
                <WeekDays
                  key={index}
                  onClick={() => {
                    handleDayClick(record);
                  }}
                >
                  <span>{record.date.format('MM/DD')}</span>
                  <span>
                    <img src="record/trash.png" alt="削除"></img>
                    {record.weight.toFixed(1)}kg
                  </span>
                </WeekDays>
              ))}
            </Week>
          ))}
        </>
      )}
      {isModalShow && (
        <Modal setIsOpen={setIsModalShow} record={selectedRecord} />
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
  font-size: 17px;
  line-height: 1;
  padding: 10px 0;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const WeekDays = styled.p`
  line-height: 1;
  font-size: 16px;
  padding: 7px 0;
  display: flex;
  justify-content: space-between;
  span {
    img {
      width: 15px;
      display: inline-block;
      margin-right: 7px;
    }
  }
`;

export default Record;
