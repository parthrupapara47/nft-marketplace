type initalstate = { collectionList: any };

const collectionState: initalstate = {
  collectionList: [
    {
      id: 1,
      name: "test1",
      location: "test1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      image: "fa fa-heart",
    },
    {
      id: 2,
      name: "test2",
      location: "test2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      image: "fa fa-heart",
    },
    {
      id: 3,
      name: "test3",
      location: "test3",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      image: "fa fa-heart",
    },
    {
      id: 4,
      name: "test4",
      location: "test4",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      image: "fa fa-heart",
    },
    {
      id: 5,
      name: "test5",
      location: "test5",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      image: "fa fa-heart",
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
    default:
      return state;
  }
};

export default collectionReducer;
