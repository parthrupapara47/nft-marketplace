import React from "react";
import { formatDistanceToNow } from "date-fns";
import dateFnsFormat from "date-fns/format";
import { Header, Mana, Profile, Responsive, Table } from "decentraland-ui";
import { NFT } from "../../modules/nft/types";

type Props = {
  nft: NFT;
};

const TransactionHistory: React.FC<Props> = (props: Props) => {
  const { orders } = props.nft;

  const INPUT_FORMAT = "PPP";
  const WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;
  const formatEventDate = (updatedAt: string) => {
    const newUpdatedAt = new Date(+updatedAt);
    return Date.now() - newUpdatedAt.getTime() > WEEK_IN_MILLISECONDS
      ? dateFnsFormat(newUpdatedAt, INPUT_FORMAT)
      : formatDistanceToNow(newUpdatedAt, { addSuffix: true });
  };

  const formatDateTitle = (updatedAt: string) => {
    return new Date(+updatedAt).toLocaleString();
  };

  return (
    <div className="TransactionHistory">
      {orders.length > 0 ? (
        <>
          <Header sub>Transaction History</Header>
          <Responsive minWidth={Responsive.onlyComputer.minWidth}>
            <Table basic="very">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>FROM </Table.HeaderCell>
                  <Table.HeaderCell>TO</Table.HeaderCell>
                  <Table.HeaderCell>WHEN</Table.HeaderCell>
                  <Table.HeaderCell>PRICE</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {orders.map((event, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <a>
                        <Profile address={event.owner} />
                      </a>
                    </Table.Cell>
                    <Table.Cell>
                      <a>
                        {event.buyer !== null ? (
                          <Profile address={event.buyer} />
                        ) : (
                          "Null"
                        )}
                      </a>
                    </Table.Cell>
                    <Table.Cell title={formatDateTitle(event.updatedAt)}>
                      {formatEventDate(event.updatedAt)}
                    </Table.Cell>
                    <Table.Cell>
                      <Mana network={undefined} inline>
                        {Math.floor(event.price / 10 ** 18)}
                      </Mana>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Responsive>
          <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
            <div className="mobile-tx-history">
              {orders.map((event, index) => (
                <div className="mobile-tx-history-row" key={index}>
                  <div className="price">
                    <Mana network={undefined} inline>
                      {Math.floor(event.price / 10 ** 18)}
                    </Mana>
                  </div>
                  <div className="when">{formatEventDate(event.updatedAt)}</div>
                </div>
              ))}
            </div>
          </Responsive>
        </>
      ) : null}
    </div>
  );
};

export default React.memo(TransactionHistory);
