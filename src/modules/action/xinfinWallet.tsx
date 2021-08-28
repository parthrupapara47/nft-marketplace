import Web3 from "web3";

declare let window: any;

const getwalletDetails = async (dispatch: any, web3: any) => {
  try {
    await window.ethereum.enable();
    const account = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();
    if (account.length !== 0 && chainId === 51) {
      const balance = await web3.eth
        .getBalance(account[0])
        .then((result: string) => web3.utils.fromWei(result, "ether"));

      let get_signature = localStorage.getItem("wallet_signature");
      let parce_signature;
      if (get_signature !== null) parce_signature = JSON.parse(get_signature);
      const isSignatureExpiry = parce_signature
        ? new Date().getTime() > new Date(parce_signature.expirytime).getTime()
        : false;
      if (
        get_signature === null ||
        parce_signature.account !== account[0] ||
        isSignatureExpiry
      ) {
        const signature = await web3.eth.personal.sign(
          "XinFin login",
          account[0],
          "xinfin-marketplace"
        );
        const expirytime = new Date(Date.now() + 2 * (60 * 60 * 1000));
        localStorage.setItem(
          "wallet_signature",
          JSON.stringify({ signature, account: account[0], expirytime })
        );
      }
      dispatch(
        _xinfinWallet({
          accounts: account[0],
          balance: balance,
          isConnected: account.length > 0 ? true : false,
          isConnecting: false,
          eth: true,
          chainId,
          signature: get_signature,
        })
      );
    } else {
      dispatch(
        _xinfinWallet({
          eth: true,
          isConnected: false,
          isConnecting: false,
          chainId,
        })
      );
    }
  } catch (error) {
    console.log(error);
    dispatch(
      _xinfinWallet({
        eth: true,
        isConnected: false,
        isConnecting: false,
      })
    );
  }
};

export const xinfinWallet = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
  } else if (window.web3) {
    window.web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  }
  const web3 = window.web3;
  if (web3) {
    return async function (dispatch: any) {
      getwalletDetails(dispatch, web3);
      window.ethereum.on("accountsChanged", function (accounts: any) {
        getwalletDetails(dispatch, web3);
      });

      window.ethereum.on("chainChanged", function (networkId: any) {
        getwalletDetails(dispatch, web3);
      });
    };
  } else {
    return _xinfinWallet({
      accounts: "",
      balance: "",
      isConnected: false,
      isConnecting: false,
      eth: false,
    });
  }
};

export const _xinfinWallet = (data: any) => {
  return { type: "WALLET", payload: data };
};

export const _walletLogOut = () => {
  return { type: "WALLET_LOGOUT", payload: null };
};
