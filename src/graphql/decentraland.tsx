import { gql } from "@apollo/client";

export const nfts = gql`
  query nfts(
    $first: Int = 50
    $skip: Int = 0
    $where: NFT_filter
    $orderBy: NFT_orderBy = updatedAt
    $orderDirection: OrderDirection = asc
  ) {
    nfts(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      tokenId
      contractAddress
      category
      owner
      tokenURI
      name
      image
      parcel {
        id
        tokenId
        owner
        x
        y
        estate
        data
        rawData
        nft
      }
      estate {
        parcels {
          x
          y
        }
      }
      wearable {
        id
        owner
        representationId
        collection
        name
        description
        category
        rarity
        bodyShapes
      }
      ens
      createdAt
      updatedAt
      searchOrderStatus
      searchOrderPrice
      searchOrderExpiresAt
      searchOrderCreatedAt
      searchIsLand
      searchText
      searchParcelIsInBounds
      searchParcelX
      searchParcelY
      searchParcelEstateId
      searchEstateSize
      searchIsWearableHead
      searchIsWearableAccessory
      searchWearableRarity
      searchWearableCategory
      searchWearableBodyShapes
    }
  }
`;

export const nft = gql`
  query nft($id: ID!) {
    nft(id: $id) {
      id
      tokenId
      contractAddress
      category
      owner {
        address
      }
      tokenURI
      orders {
        id
        category
        nftAddress
        tokenId
        txHash
        owner
        buyer
        price
        status
        blockNumber
        expiresAt
        createdAt
        updatedAt
      }
      bids {
        id
        category
        nftAddress
        tokenId
        bidder
        seller
        price
        fingerprint
        status
        blockchainId
        blockNumber
        expiresAt
        createdAt
        updatedAt
      }
      activeOrder {
        id
        category
        nft
        nftAddress
        tokenId
        txHash
        owner
        buyer
        price
        status
        blockNumber
        expiresAt
        createdAt
        updatedAt
      }
      name
      image
      parcel {
        id
        tokenId
        owner
        x
        y
        estate
        data {
          description
        }
        rawData
        nft
      }
      estate {
        parcels {
          x
          y
        }
        data {
          description
        }
      }
      wearable {
        id
        owner
        representationId
        collection
        name
        description
        category
        rarity
        bodyShapes
      }
      ens
      createdAt
      updatedAt
      searchOrderStatus
      searchOrderPrice
      searchOrderExpiresAt
      searchOrderCreatedAt
      searchIsLand
      searchText
      searchParcelIsInBounds
      searchParcelX
      searchParcelY
      searchParcelEstateId
      searchEstateSize
      searchIsWearableHead
      searchIsWearableAccessory
      searchWearableRarity
      searchWearableCategory
      searchWearableBodyShapes
    }
  }
`;
