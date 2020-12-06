import useFetchPastWeights from '../hooks/fetchPastWeights';

const PastWeight = () => {
  const weights = useFetchPastWeights();
  return (
    <div>
      {weights?.map(({ weight, date }, index) => (
        <p>
          {`${date.getMonth() + 1}/${date.getDate()}`} : {weight}kg
        </p>
      ))}
    </div>
  );
};

export default PastWeight;
