import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LineChart, Line, YAxis, XAxis, CartesianGrid } from 'recharts';
const PastWeight = ({ data: rawData }) => {
  const [range, setRange] = useState(1);
  const [windowWidth, setWindowWidth] = useState(375);

  useEffect(() => {
    setWindowWidth(Math.min(500, window.innerWidth));
  }, []);

  const getFormattedData = () => {
    if (!range) return rawData;
    const weekLength = range * 4;
    const weeks = rawData.weeks.slice(rawData.weeks.length - weekLength);
    const weights = weeks.map(({ averageWeight }) => averageWeight);

    const maxWeight = Math.max(...weights);
    const minWeight = Math.min(...weights);

    const integerArr = [...Array(100).keys()];
    const ticks = integerArr.filter((num) => {
      return num > minWeight - 2 && num < maxWeight + 2;
    });
    return {
      maxWeight,
      minWeight,
      ticks,
      weeks,
    };
  };
  const data = getFormattedData();

  const getWeightChangePerWeek = () => {
    if (data.weeks.length === 0) return null;
    const weekLength = data.weeks.length;
    const beginningWeight = data.weeks[0].averageWeight;
    const currentWeight = data.weeks[weekLength - 1].averageWeight;
    return (
      Math.floor(((currentWeight - beginningWeight) * 10) / weekLength) / 10
    );
  };

  return (
    <Wrap>
      <RangeSelecter>
        <Range
          isActive={range === 1}
          onClick={() => {
            setRange(1);
          }}
        >
          1ヶ月
        </Range>
        <Range
          isActive={range === 3}
          onClick={() => {
            setRange(3);
          }}
        >
          3ヶ月
        </Range>
        <Range
          isActive={range === null}
          onClick={() => {
            setRange(null);
          }}
        >
          すべて
        </Range>
      </RangeSelecter>
      {data.weeks.length > 0 && (
        <LineChart
          width={windowWidth}
          height={200}
          data={data.weeks}
          margin={{ top: 5, right: 30, bottom: 0, left: 10 }}
        >
          <Line
            type="monotone"
            dataKey="averageWeight"
            stroke="#00214d"
            dot={{ stroke: '#00214d', strokeWidth: 2 }}
          />
          <YAxis
            domain={[data.minWeight - 2, data.maxWeight + 2]}
            width={30}
            ticks={data.ticks}
            minTickGap={1}
            stroke="#00214d"
          />
          <XAxis dataKey="firstDay" stroke="#00214d" />
          <CartesianGrid strokeDasharray="3 3" />
        </LineChart>
      )}
      <WeightChange isNegative={getWeightChangePerWeek() < 0}>
        {getWeightChangePerWeek() < 0 ? '-' : '＋'}
        {Math.abs(getWeightChangePerWeek())}kg/週
      </WeightChange>
    </Wrap>
  );
};

const RangeSelecter = styled.div`
  padding: 10px;
`;

const Range = styled.button`
  border-radius: 5px;
  background-color: ${({ isActive }) => (isActive ? '#00214d' : 'transparent')};
  color: ${({ isActive }) => (isActive ? 'white' : '#00214d')};
  font-size: 12px;
  padding: 5px 10px;
  text-align: center;
  display: inline-block;
  margin-right: 5px;
  letter-spacing: 0.05em;
`;

const Wrap = styled.div`
  margin: 10px auto 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  flex-direction: column;
  max-width: 500px;
`;

const WeightChange = styled.p`
  padding: 15px 10px;
  text-align: center;
  letter-spacing: 0.05em;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-content: center;
  color: ${({ isNegative }) => (isNegative ? '#00214d' : '#ff5470')};
  p {
    line-height: 1;
    vertical-align: middle;
  }
`;

export default PastWeight;
