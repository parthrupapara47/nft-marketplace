export const form = {
  name: "",
  description: "",
  image: null,
};

export interface FORM {
  name: string;
  description: string;
  image: string | ArrayBuffer | null;
}

export const errorForm = {
  name: false,
  description: false,
  file: false,
  maxSize: false,
};
