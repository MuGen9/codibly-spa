import { CssBaseline } from '@mui/material';

import { AppProvidersProps } from './AppProviders.types';

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
};
