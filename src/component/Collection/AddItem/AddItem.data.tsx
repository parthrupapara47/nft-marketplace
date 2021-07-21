export const itemField = [
  { label: "Name", placeholder: "Test 1-(i)", name: "name" },
  {
    label: "External Link",
    placeholder: "",
    name: "externalLink",
  },
  {
    label: "Description",
    placeholder: "",
    name: "description",
  },
];

export const defaultValue = {
  name: "",
  externalLink: "",
  description: "",
  file: "",
};

export const defaultError = {
  name: false,
  externalLink: false,
  description: false,
  file: false,
};

export const file = {
  label: "Upload file",
  name: "file",
  type: "file",
  accept:
    ".pdf, .mkv, .mp4, .webm, .imge, .jpeg, .jpg, .mov, .png, .3ds, .fbx, .dae, .stp, .obj",
};
