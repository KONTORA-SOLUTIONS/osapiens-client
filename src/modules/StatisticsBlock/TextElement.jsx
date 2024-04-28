import styled from "styled-components";

const TextElement = ({ number, title, text }) => {
  return (
    <Wrapper>
      <Title>
        <HighLighted>{number}</HighLighted> {title}
      </Title>
      <Text>{text}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Title = styled.p`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  text-align: right;
`;

const HighLighted = styled.span`
  color: #3c3;
`;

const Text = styled.p`
  font-size: 20px;
  color: #fff;
  text-align: right;
`;

export default TextElement;
