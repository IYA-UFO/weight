import useFetchPastWeights from '../../hooks/fetchPastWeights';
import Week from './Week';

const PastWeight = () => {
  const results = useFetchPastWeights();
  return (
    <div>
      {results.map(({ week, records }) => (
        <Week week={week} records={records} key={week} />
      ))}
    </div>
  );
};

export default PastWeight;
