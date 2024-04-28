import styled from "styled-components";
import TextElement from "./TextElement";

const StatisticsBlock = () => {
  return (
    <Wrapper>
      <TextBlock>
        <TextElement
          number="95%"
          title="of Amazon deforestation is near rodes and rivers"
          text="This suggests that access to infrastructure is a critical factor in deforestation. This lack of investigation likely contributes to ongoing environmental degradation and loss of biodiversity."
        />
        <TextElement
          number="98%"
          title="of Brazil`s deforestation alerts don`t get investigated"
          text="This alarming statistic highlights the challenges in enforcing environmental laws and protecting critical habitats. As a result, illegal logging and land clearing continue to thrive, exacerbating the loss of biodiversity and contributing to global climate change."
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
  align-self: center;
  width: 100%;
  border-radius: 10px;
`;

const TextBlock = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

export default StatisticsBlock;
