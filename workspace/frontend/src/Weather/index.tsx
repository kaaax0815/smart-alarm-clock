import StartButton from '../components/StartButton';
import Forecast from './Forecast';
import Header from './Header';
import Hero from './Hero';
import Hourly from './Hourly';
import styles from './index.module.css';

function Weather(): JSX.Element {
  return (
    <div className={styles.Weather}>
      <StartButton />
      <Header />
      <Hero />
      <Hourly />
      <Forecast />
    </div>
  );
}

export default Weather;
