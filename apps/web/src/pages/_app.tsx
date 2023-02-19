import { midnightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { goerli } from 'wagmi/chains';

import { LensConfig, staging, LensProvider } from '@lens-protocol/react';
import { localStorage } from '@lens-protocol/react/web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';

import WagmiProvider from '../WagmiProvider';

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: staging,
  storage: localStorage()
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const { chains } = configureChains([goerli], [publicProvider()]);

  return (
    <WagmiProvider>
      <LensProvider config={lensConfig}>
        <RainbowKitProvider chains={chains} theme={midnightTheme()} coolMode>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </LensProvider>
    </WagmiProvider>
  );
};

export default MyApp;
