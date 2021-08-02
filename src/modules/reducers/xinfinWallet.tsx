export type WalletState = {
  accounts: string;
  balance: string;
  isConnected: boolean;
  isConnecting: boolean;
  eth: boolean | null;
  chainId: number | null;
};

const WalletState: WalletState = {
  accounts: "",
  balance: "",
  isConnected: false,
  isConnecting: false,
  eth: null,
  chainId: null,
};

type Action = {
  type: string;
  payload: any;
};

const xinfinWallet = (state = WalletState, action: Action) => {
  switch (action.type) {
    case "WALLET":
      return { ...state, ...action.payload };
    case "WALLET_LOGOUT":
      return WalletState;
    default:
      return state;
  }
};

export default xinfinWallet;
