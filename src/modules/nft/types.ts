
export enum Category {
    PARCEL = 'parcel',
    ESTATE = 'estate',
    WEARABLE = 'wearable',
    ENS = 'ens',
    ART = 'art'
}

export enum WearableBodyShape {
    BASE_FEMALE = "BaseFemale",
    BASE_MALE = "BaseMale"
}

export enum BodyShapeType {
    BOTH = 'both',
    MALE = 'male',
    FEMALE = 'female'
}

export enum WearableCategory {
    EYEBROWS = 'eyebrows',
    EYES = 'eyes',
    FACIAL_HAIR = 'facial_hair',
    HAIR = 'hair',
    MOUTH = 'mouth',
    UPPER_BODY = 'upper_body',
    LOWER_BODY = 'lower_body',
    FEET = 'feet',
    EARRING = 'earring',
    EYEWEAR = 'eyewear',
    HAT = 'hat',
    HELMET = 'helmet',
    MASK = 'mask',
    TIARA = 'tiara',
    TOP_HEAD = 'top_head'
}
export type Account = {
    id: string,
    address: string
    nfts: NFT
    mana: BigInt
}
export enum OrderStatus {
    OPEN = "open",
    SOLD = "sold",
    CANCELLED = "cancelled"
}

export type Order = {
    id: string
    category: Category
    nft: NFT
    nftAddress: string
    tokenId: BigInt
    txHash: string
    owner: string
    buyer: string
    price: number
    status: OrderStatus
    blockNumber: BigInt
    expiresAt: string
    createdAt: string
    updatedAt: string
}

export type Parcel = {
    id: string
    tokenId: BigInt
    owner: Account
    x: string
    y: string
    estate: Estate
    data: Data
    rawData: string
    nft: NFT
}

export type Estate = {
    id: string
    tokenId: BigInt
    owner: Account
    parcels: [Parcel]
    size: Number
    data: Data
    rawData: string
    nft: NFT
}

export type Wearable = {
    id: string
    owner: Account
    representationId: string
    collection: string
    name: string
    description: string
    category: WearableCategory
    rarity: WearableRarity
    bodyShapes: [WearableBodyShape]
    nft: NFT
}

export type Bid = {
    id: string
    category: Category
    nft: NFT
    nftAddress: string
    tokenId: string
    bidder: string
    seller: string
    price: string
    fingerprint: string
    status: OrderStatus
    blockchainId: String
    blockNumber: string
    expiresAt: string
    createdAt: string
    updatedAt: string
}


export type ENS = {
    id: string
    tokenId: BigInt
    owner: Account
    caller: string
    beneficiary: string
    labelHash: string
    subdomain: string
    createdAt: BigInt
    nft: NFT
}

export enum WearableRarity {
    UNIQUE = "unique",
    MYTHIC = "mythic",
    LEGENDARY = "legendary",
    EPIC = "epic",
    RARE = "rare",
    UNCOMMON = "uncommon",
    COMMON = "common",
}

export const RARITY_COLOR_LIGHT = {
    [WearableRarity.UNIQUE]: '#FFE617',
    [WearableRarity.MYTHIC]: '#FB7DE3',
    [WearableRarity.LEGENDARY]: '#A657ED',
    [WearableRarity.EPIC]: '#6397F2',
    [WearableRarity.RARE]: '#3AD682',
    [WearableRarity.UNCOMMON]: '#FF8563',
    [WearableRarity.COMMON]: '#D4E0E0'
}

export const RARITY_COLOR = {
    [WearableRarity.UNIQUE]: '#FFB626',
    [WearableRarity.MYTHIC]: '#FF63E1',
    [WearableRarity.LEGENDARY]: '#842DDA',
    [WearableRarity.EPIC]: '#3D85E6',
    [WearableRarity.RARE]: '#36CF75',
    [WearableRarity.UNCOMMON]: '#ED6D4F',
    [WearableRarity.COMMON]: '#ABC1C1'
}

export const RARITY_TITLE = {
    [WearableRarity.UNIQUE]: "Grail-like: One-of-a-kind",
    [WearableRarity.MYTHIC]: "For the lucky few: max 10",
    [WearableRarity.LEGENDARY]: "Limited supply: max 100",
    [WearableRarity.EPIC]: "Max supply: 1000",
    [WearableRarity.RARE]: "Max supply: 5000",
    [WearableRarity.UNCOMMON]: "Max supply: 10,000",
    [WearableRarity.COMMON]: "Max supply: 100,000",
};

export type Data = {
    id: string
    parcel: Parcel
    estate: Estate
    version: string
    name: string
    description: string
    ipns: string
}

export type NFT = {
    id: string
    tokenId: number
    contractAddress: number
    category: Category
    owner: Account
    tokenURI: string
    orders: [Order]
    bids: [Bid]
    activeOrder: Order
    name: string
    image: string
    parcel: Parcel
    estate: Estate
    wearable: Wearable
    ens: ENS
    createdAt: number
    updatedAt: number
    searchOrderStatus: OrderStatus
    searchOrderPrice: number
    searchOrderExpiresAt: number
    searchOrderCreatedAt: number
    searchIsLand: Boolean
    searchText: string
    searchParcelIsInBounds: Boolean
    searchParcelX: string
    searchParcelY: string
    searchParcelEstateId: string
    searchEstateSize: number
    searchIsWearableHead: Boolean
    searchIsWearableAccessory: Boolean
    searchWearableRarity: WearableRarity
    searchWearableCategory: WearableCategory
    searchWearableBodyShapes: [WearableBodyShape]
}