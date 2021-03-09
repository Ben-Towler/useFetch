import React, { useState } from 'react';

import '../styles/globals.css';
import { CacheProvider } from '@lib/providers';

const App = ({ Component, pageProps }) => {
  const [cache, updateCache] = useState(null);

  return (
    <CacheProvider value={{ cache, updateCache }}>
      <Component {...pageProps} />
    </CacheProvider>
  )
}

export default App;
