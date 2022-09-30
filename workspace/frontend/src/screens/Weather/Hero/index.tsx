import { Grid } from '@mui/material';

import Current from './Current';
import Details from './Details';
import styles from './index.module.css';

export default function Hero() {
  return (
    <Grid container className={styles.hero}>
      <Current />
      <Details />
    </Grid>
  );
}
