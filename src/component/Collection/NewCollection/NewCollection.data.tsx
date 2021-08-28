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

export const errorForm: ErrorForm = {
  name: false,
  description: false,
  file: false,
  maxSize: false,
  image: false,
};

export type ErrorForm = {
  name: boolean;
  description: boolean;
  file: boolean;
  maxSize: boolean;
  image: boolean;
};
