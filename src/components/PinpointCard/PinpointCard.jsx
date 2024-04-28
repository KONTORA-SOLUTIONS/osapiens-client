import styled from "styled-components";
import { UpvoteIcon } from "../Icons/Icons";

const PinpointCard = ({ id, user: { full_name }, text, isActive = false }) => {
  return (
    <Wrapper isActive={isActive} className="aaa333aaa333aaa">
      <div>
        <Title isActive={isActive}>
          <HighlightText>Pinpoint {id}</HighlightText> | Created by {full_name}
        </Title>
      </div>

      <Text isActive={true}>{text}</Text>
      <UpvoteIcon></UpvoteIcon>
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
