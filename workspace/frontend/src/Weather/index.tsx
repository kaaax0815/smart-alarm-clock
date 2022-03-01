import './index.css';

import StartButton from '../components/StartButton';
import Header from './Header';
import Hero from './Hero';
import Hourly from './Hourly';

function Weather(): JSX.Element {
  return (
    <div className="Weather">
      <StartButton />
      <Header />
      <Hero />
      <Hourly />
    </div>
  );
}

export default Weather;
