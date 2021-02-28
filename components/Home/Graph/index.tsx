import styled from 'styled-components';
import useFetchPastWeights from 'hooks/fetchPastWeights';
import { LineChart, Line, YAxis, XAxis, CartesianGrid } from 'recharts';
const PastWeight = ({ data }) => (
  <Wrap>
    <LineChart
      width={375}
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
      />
      <XAxis dataKey="firstDay" />
      <CartesianGrid strokeDasharray="3 3" />
    </LineChart>
  </Wrap>
);

const Wrap = styled.div`
  margin: 10px 0 0;
  display: flex;
  justify-content: center;
  width: 100vw;
`;

export default PastWeight;
