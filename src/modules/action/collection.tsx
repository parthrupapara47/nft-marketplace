export const addNewCollection = (data: any) => {
  return { type: "ADD_COLLECTION", payload: data };
};

export const updateCollection = (data: any) => {
  return { type: "UPDATE_COLLECTION", payload: data };
};
