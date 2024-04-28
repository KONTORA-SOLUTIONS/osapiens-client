import styled from "styled-components";
import TextElement from "./TextElement";

const StatisticsBlock = () => {
  return (
    <Wrapper>
      <TextBlock>
        <TextElement
          number="98%"
          title="of cases doesn’t even get investigated"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        />
        <TextElement
          number="98%"
          title="of cases doesn’t even get investigated"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        />
      </TextBlock>
      <FoggedForestImage
        alt="Fogged forest"
        src="./assets/images/fogged-forest.png"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;
`;

const FoggedForestImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const TextBlock = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  row-gap: 50px;
`;

export default StatisticsBlock;
