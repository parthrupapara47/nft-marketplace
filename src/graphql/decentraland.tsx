import { gql } from "@apollo/client";

export const nfts = gql`
  query nftdatas(
    $first: Int = 100
    $skip: Int = 0
    $where: NFTData_filter
    $orderBy: NFTData_orderBy = updatedAt
    $orderDirection: OrderDirection = asc
  ) {
    nftdatas(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      _tokenId
      nftAddress
      _by
      tokenURI
      activeOrder
      name
      image
      createdAt
      updatedAt
      searchOrderStatus
      searchOrderPrice
      searchOrderExpiresAt
      searchOrderCreatedAt
      searchText
      orders {
        id
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
    }
  }
`;



export const nft = gql`
  query nftdata($id: ID!) {
    nftdata(id: $id) {
      id
      _tokenId
      nftAddress
      _by
      tokenURI
      name
      image
      createdAt
      updatedAt
      searchOrderStatus
      searchOrderPrice
      searchOrderExpiresAt
      searchOrderCreatedAt
      searchText
      orders {
        id
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
      activeOrder {
        id
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
    }
  }
`;
