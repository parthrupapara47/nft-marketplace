import React from "react";
import { Table as BaseTable } from "decentraland-ui";
import "./Table.css";

type Props = { header: Array<string>; body: Array<object> };

const Table: React.FC<Props> = (props: Props) => {
  return (
    <div className="basetable">
      <BaseTable basic="very">
        <BaseTable.Header>
          <BaseTable.Row>
            {props.header.map((each, index) => (
              <BaseTable.HeaderCell key={index} textAlign="center">
                {each}
              </BaseTable.HeaderCell>
            ))}
          </BaseTable.Row>
        </BaseTable.Header>
        <BaseTable.Body className="tablebody">
          {props.body.map((each: any, index) => (
            <BaseTable.Row key={index}>
              {Object.keys(each).map((value, index) => (
                <BaseTable.Cell
                  className="closed"
                  key={index}
                  textAlign="center"
                >
                  {each[value]}
                </BaseTable.Cell>
              ))}
            </BaseTable.Row>
          ))}
        </BaseTable.Body>
      </BaseTable>
    </div>
  );
};

export default React.memo(Table);
