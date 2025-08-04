import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';

// 1. Get a project ID from https://cloud.walletconnect.com
//    You must create an account and a project to get this ID.
//    REPLACE 'YOUR_WALLETCONNECT_PROJECT_ID' WITH YOUR ACTUAL PROJECT ID.
//    The WebSocket connection errors (code: 3000, "Project not found") are because this ID is missing or invalid.
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID';

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
};

// 3. Create modal
const metadata = {
  name: 'LookSeel',
  description: 'LookSeel - A decentralized, secure platform for creators.',
  url: window.location.origin, // Using origin is crucial for security and COOP policies
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// Check if projectId is valid before initializing
let modal;
const isProjectIdValid = projectId && projectId !== 'YOUR_WALLETCONNECT_PROJECT_ID';

if (isProjectIdValid) {
  const ethersConfig = defaultConfig({
    metadata,
    enableEIP6963: true,
    enableInjected: true,
    enableCoinbase: true,
  });

  modal = createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    defaultChain: mainnet,
    enableAnalytics: false,
    themeMode: 'dark',
    themeVariables: {
      '--w3m-accent': '#a855f7', // Purple-500
      '--w3m-border-radius-master': '1rem',
    }
  });
}

const showConfigurationError = () => {
  const errorMessage = 'WalletConnect is not configured. The developer must provide a valid Project ID in `services/walletConnectService.ts` to enable wallet functionality.';
  console.error(errorMessage);
  alert(errorMessage);
};

/**
 * Opens the WalletConnect modal and waits for the user to connect.
 * @returns The connected wallet address as a string, or undefined if the user cancels or if not configured.
 */
export const openConnectModal = async (): Promise<string | undefined> => {
  if (!isProjectIdValid || !modal) {
    showConfigurationError();
    return;
  }
  await modal.open();
  // The promise from `open()` resolves when the modal is closed. We can then get the address.
  return modal.getAddress();
};

/**
 * Gets the currently connected address without opening the modal.
 * @returns The connected address or undefined if not connected or not configured.
 */
export const getConnectedAddress = (): string | undefined => {
  if (!isProjectIdValid || !modal) {
    return undefined;
  }
  return modal.getAddress();
};

/**
 * Disconnects the current session.
 */
export const disconnect = async (): Promise<void> => {
  if (!isProjectIdValid || !modal) {
    return;
  }
  await modal.disconnect();
};