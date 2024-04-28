import styled from "styled-components";
import { UpvoteIcon } from "../Icons/Icons";
import React, { useState } from "react";

const PinpointCard = ({
  id,
  user: { full_name },
  initialText,
  isActive = false,
}) => {
  function generateRandomNumber() {
    return Math.floor(Math.random() * (1000 - 237 + 1)) + 237;
  }
  const [text, setText] = useState(generateRandomNumber());

  const [upvoted, setUpvoted] = useState(false);

  console.log(initialText);

  return (
    <Wrapper isActive={isActive} className="aaa333aaa333aaa">
      <div style={{ display: "flex" }}>
        <Title isActive={isActive}>
          <HighlightText>Pinpoint {id}</HighlightText> | Created by {full_name}
        </Title>
      </div>
      <div
        onClick={() => {
          if (!upvoted) setText(parseInt(text) + 1);
          else setText(parseInt(text) - 1);
          setUpvoted(!upvoted);
        }}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          rowGap: "20px",
        }}
      >
        <Title isActive={isActive}>
          <HighlightText>{text}</HighlightText>
        </Title>
        <UpvoteIcon filled={upvoted}></UpvoteIcon>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  row-gap: 20px;
  border-top: 1px solid #fff;
  padding: 15px 0;

  :first-of-type {
    border: none;
  }
`;

const Title = styled.p`
  color: ${(props) =>
    props.isActive ? "#00ff00" : "#fff"}; /* Green if active, white otherwise */
  font-size: 20px;
`;

const HighlightText = styled.span`
  font-weight: bold;
`;

const Text = styled.p`
  color: ${(props) =>
    props.isActive ? "#00ff00" : "#fff"}; /* Green if active, white otherwise */
  font-size: 16px;
`;

export default PinpointCard;
