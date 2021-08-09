type initalstate = { collectionList: any };

const collectionState: initalstate = {
  collectionList: [
    {
      id: 1,
      name: "Hat",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      image:
        "https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:matic:collections-v2:0x66194b1abcbfbedd83841775404b245c8f9e4183:2/thumbnail",
    },
    {
      id: 2,
      name: "Jacket",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      image:
        "https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:matic:collections-v2:0xa1e2f2a99f9ea8f9e92e81842470e9e0041428b8:2/thumbnail",
    },
  ],
};

type Action = {
  type: string;
  payload: any;
};

const collectionReducer = (state = collectionState, action: Action) => {
  switch (action.type) {
    case "ADD_COLLECTION":
      const newCollection = {
        id: state.collectionList.length + 1,
        ...action.payload,
      };
      state.collectionList.unshift(newCollection);
      return state;
    case "UPDATE_COLLECTION":
      const updated = state.collectionList.filter(
        (each: any) => each.id !== action.payload.id
      );
      updated.push(action.payload);
      console.log(updated);
      return { ...state, collectionList: updated };
    default:
      return state;
  }
};

export default collectionReducer;
