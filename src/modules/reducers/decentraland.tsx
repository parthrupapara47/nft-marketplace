const nftState: any = [];

type Action = {
  type: string;
  payload: any;
};

const nftData = (state = nftState, action: Action) => {
  switch (action.type) {
    case "ADD_NFT":
      return { ...state, nft: action.payload };
    default:
      return state;
  }
};

export default nftData;
