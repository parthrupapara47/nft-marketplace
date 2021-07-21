import React from "react";
import { Card as BaseCard } from "decentraland-ui";
import { Link } from "react-router-dom";
import "./Card.css";

type Props = {
  link: string;
  image: string;
  header?: any;
  meta: any;
  click?: any;
};

const Card: React.FC<Props> = (props: Props) => {
  return (
    <>
      <BaseCard link to={props.link} as={Link}>
        <BaseCard.Content>
          <BaseCard.Header textAlign="center">
            <i
              className={props.image}
              style={{
                fontSize: "60px",
                textAlign: "center",
                color: "black",
              }}
            />
            {props.header}
          </BaseCard.Header>
          <BaseCard.Meta textAlign="center">{props.meta}</BaseCard.Meta>
        </BaseCard.Content>
      </BaseCard>
    </>
  );
};

export default React.memo(Card);
