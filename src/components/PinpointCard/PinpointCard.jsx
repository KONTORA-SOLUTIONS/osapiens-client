import styled from "styled-components";

const PinpointCard = ({ id, user: { full_name }, text }) => {
  return (
    <Wrapper className="aaa333aaa333aaa">
      <Title>
        <HighlightText>Pinpoint {id}</HighlightText> | Created by {full_name}
      </Title>
      <Text>{text}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  border-top: 1px solid #fff;
  padding: 15px 0;

  :first-of-type {
    border: none;
  }
`;

const Title = styled.p`
  color: #fff;
  font-size: 20px;
`;

const HighlightText = styled.span`
  font-weight: bold;
`;

const Text = styled.p`
  color: #fff;
  font-size: 16px;
`;

export default PinpointCard;
