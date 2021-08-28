export type WalletState = {
  accounts: string;
  balance: string;
  isConnected: boolean;
  isConnecting: boolean;
  eth: boolean | null;
  chainId: number | null;
  signature: string | null;
};

const walletState: WalletState = {
  accounts: "",
  balance: "",
  isConnected: false,
  isConnecting: false,
  eth: null,
  chainId: null,
  signature: null,
};

type Action = {
  type: string;
  payload: any;
};

const xinfinWallet = (state = walletState, action: Action) => {
  switch (action.type) {
    case "WALLET":
      return { ...state, ...action.payload };
    case "WALLET_LOGOUT":
      return walletState;
    default:
      return state;
  }
};

export default xinfinWallet;
