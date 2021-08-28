import {
  Category,
  WearableCategory,
  WearableRarity,
} from "../../../modules/nft/types";

export const defaultValue: NEW_ITEM = {
  name: "",
  externalLink: "",
  description: "",
  file: "",
  rarity: "",
  bodyShape: "",
  category: "",
};

export interface NEW_ITEM {
  name: string;
  externalLink: string;
  description: string;
  file: File | string;
  rarity: string;
  bodyShape: string;
  category: string;
}

export const defaultError = {
  name: false,
  externalLink: false,
  description: false,
  file: false,
  maxSize: false,
  rarity: false,
  category: false,
};

export const file = {
  label: "Upload file",
  name: "file",
  type: "file",
  accept:
    ".pdf, .mkv, .mp4, .webm, .imge, .jpeg, .jpg, .mov, .png, .3ds, .fbx, .dae, .stp, .obj",
};

export const dropdownOptions = [{ value: Category.WEARABLE, text: "Wereable" }];

export const rarityOptation = [
  { value: WearableRarity.COMMON, text: "Common" },
  { value: WearableRarity.UNIQUE, text: "Unique" },
  { value: WearableRarity.EPIC, text: "Epic" },
  { value: WearableRarity.LEGENDARY, text: "Legendary" },
  { value: WearableRarity.MYTHIC, text: "Mythic" },
  { value: WearableRarity.RARE, text: "Rare" },
  { value: WearableRarity.UNCOMMON, text: "Uncommon" },
];

export const categoryOptation = [
  { value: WearableCategory.EYEBROWS, text: "Eyebrows" },
  { value: WearableCategory.EYES, text: "Eyes" },
  { value: WearableCategory.MOUTH, text: "Mouth" },
];
