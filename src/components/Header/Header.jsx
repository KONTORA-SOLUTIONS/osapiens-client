import styled from "styled-components";
import { TreeIcon } from "../Icons/Icons";

const Header = () => {
  return (
    <Wrapper>
      <Logo>planetree</Logo>
      <RightGroup>
        <SavedTrees>
          <SavedTreesText>5 x </SavedTreesText>
          <TreeIcon />
        </SavedTrees>
        <Name>Abraham Lincoln</Name>
      </RightGroup>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  border-bottom: 2px solid #33cc33;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;
`;

const Logo = styled.p`
  font-size: 24px;
  color: #3c3;
  font-weight: bolder;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

const Name = styled.p`
  font-size: 18px;
  color: #3c3;
`;

const SavedTrees = styled.div`
  display: flex;
  align-items: center;
  column-gap: 7px;

  & > svg {
    width: 36px;
    height: 36px;
    fill: #3c3;
  }
`;

const SavedTreesText = styled.div`
  font-size: 18px;
  color: #3c3;
`;

export default Header;
