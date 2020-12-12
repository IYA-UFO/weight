import styled from 'styled-components';

import { useState } from 'react';
const average = (arr) =>
  arr.reduce(function (prev, current, i, arr) {
    return prev + current;
  }) / arr.length;

const Week = ({ week, records }) => {
  const [isOpen, setIsOpen] = useState(false);
  const averageWeight = average(records.map((record) => record.weight));
  return (
    <div key={week}>
      <h3
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {week}週 {Math.round(averageWeight * 10) / 10}kg
      </h3>
      {isOpen && (
        <div>
          {records?.map(({ weight, date, week }, index) => (
            <p key={index}>
              {`${date.month() + 1}/${date.date()}`} : {weight}kg
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Week;
