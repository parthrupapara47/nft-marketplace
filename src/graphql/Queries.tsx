import { gql } from "@apollo/client";

export const NFT = gql`
  query nftdata($id: ID!, $block: Block_height) {
    nft(id: $id, block: $block) {
      id
      _tokenId
      owner
      tokenURI
    }
  }
`;

export const NFTS = gql`
  query nftdatas(
    $skip: Int
    $first: Int = 100
    $orderBy: NFTData_orderBy
    $orderDirection: OrderDirection
    $where: NFTData_filter
    $block: Block_height
  ) {
    nftdatas(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      id
      _tokenId
      owner
      tokenURI
    }
  }
`;

export const ACCOUNT = gql`
  query account($id: ID!, $block: Block_height) {
    account(id: $id, block: $block) {
      id
      address
    }
  }
`;


export const ACCOUNTS = gql`
  query accounts(
    $skip: Int
    $first: Int
    $orderBy: Account_orderBy
    $orderDirection: OrderDirection
    $where: Account_filter
    $block: Block_height
  ) {
    accounts(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      id
      address
    }
  }
`;

export const APPROVAL_TRANSACTION = gql`
  query ApprovalTransaction($id: ID!, $block: Block_height) {
    approvalTransaction(id: $id, block: $block) {
      id
      owner
      approvedTo
      tokenID
    }
  }
`;

export const APPROVAL_TRANSACTIONS = gql`
  query ApprovalTransactions(
    $skip: Int = 0
    $first: Int = 100
    $orderBy: ApprovalTransaction_orderBy
    $orderDirection: OrderDirection
    $where: ApprovalTransaction_filter
    $block: Block_height
  ) {
    approvalTransactions(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      id
      owner
      approvedTo
      tokenID
    }
  }
`;

export const TRANSFER_TRANSACTION = gql`
  query TransferTransaction($id: ID!, $block: Block_height) {
    transferTransaction(id: $id, block: $block) {
      id
      from
      to
      tokenID
    }
  }
`;

export const TRANSFER_TRANSACTIONS = gql`
  query TransferTransactions(
    $skip: Int = 0
    $first: Int = 100
    $orderBy: TransferTransaction_orderBy
    $orderDirection: OrderDirection
    $where: TransferTransaction_filter
    $block: Block_height
  ) {
    transferTransactions(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      id
      from
      to
      tokenID
    }
  }
`;

export const META = gql`
  query Meta($block: Block_height) {
    _meta(block: $block) {
      block
      deployment
      hasIndexingErrors
    }
  }
`;
