import { Grid } from '@mui/material';

import Current from './Current';
import Details from './Details';

export default function Hero() {
  return (
    <Grid container>
      <Current />
      <Details />
    </Grid>
  );
}
