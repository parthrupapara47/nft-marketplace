import React from "react";
import { Hero as Description } from "decentraland-ui";
import "./Hero.css";

type Props = {
  header: string;
  description?: string;
};

const Hero: React.FC<Props> = (props: Props) => {
  const { header, description } = props;
  return (
    <Description className="HomePageHero">
      <Description.Header>{header}</Description.Header>
      <Description.Description>{description}</Description.Description>
    </Description>
  );
};

export default React.memo(Hero);
