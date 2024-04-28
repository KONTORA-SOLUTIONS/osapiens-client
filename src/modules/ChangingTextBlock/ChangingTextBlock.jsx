import React, { useState, useEffect } from "react";
import AnimatedNumber from "react-animated-numbers";
import styled from "styled-components";

const ChangingTextBlock = () => {
  const [count, setCount] = useState(0);

  const letterWidth = 41;

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 80);
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Wrapper>
      <DeforestedImage
        alt="Deforested area"
        src="./assets/images/deforested-area.jpg"
      />
      <TextWrapper>
        <MotivationTextDummy>
          {count} trees have been lost since you opened this website. Let us
          stop it together.
        </MotivationTextDummy>
        <AnimatedNumberHolder>
          <AnimatedNumber
            fontStyle={{ fontWeight: "bold", color: "#3c3", fontSize: "64px" }}
            animateToNumber={count}
          />
        </AnimatedNumberHolder>
        <MotivationText indent={count.toString().length * letterWidth + 20}>
          trees have been <RedHightLight>lost</RedHightLight> since you opened
          this website. Let us stop it together.
        </MotivationText>
      </TextWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 50px;
`;

const TextWrapper = styled.div`
  position: relative;
  align-self: center;
`;

const DeforestedImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const AnimatedNumberHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const MotivationText = styled.p`
  font-weight: bold;
  color: #fff;
  font-size: 64px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  text-indent: ${(props) => props.indent.toString() + "px"};
  transition: all 0.3s ease-in;
`;

const MotivationTextDummy = styled.p`
  font-weight: bold;
  color: #fff;
  font-size: 64px;
  opacity: 0;
`;

const RedHightLight = styled.span`
  color: red;
`;

export default ChangingTextBlock;
