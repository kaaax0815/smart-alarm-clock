import './index.css';

import StartButton from '../components/StartButton';

function Weather(): JSX.Element {
  return (
    <div className="Weather">
      <StartButton />
      <h1>Weather</h1>
    </div>
  );
}

export default Weather;
