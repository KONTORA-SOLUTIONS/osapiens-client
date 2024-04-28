import styled from "styled-components";
import PinpointCard from "../../components/PinpointCard/PinpointCard";

const MapBlock = () => {
  return (
    <Wrapper>
      <Title>What's poppin</Title>
      <MapGrid>
        <MapPlaceholder />
        <ReviewCardList>
          <PinpointCard
            id="9045"
            user={{ full_name: "Theodore Rusevelt" }}
            text="There is a crazy deforestation up here. Coca Cola compamy is destroying Amazon wild forests. And Metro is fucking boomin"
          />
          <PinpointCard
            id="9045"
            user={{ full_name: "Theodore Rusevelt" }}
            text="There is a crazy deforestation up here. Coca Cola compamy is destroying Amazon wild forests. And Metro is fucking boomin"
          />
          <PinpointCard
            id="9045"
            user={{ full_name: "Theodore Rusevelt" }}
            text="There is a crazy deforestation up here. Coca Cola compamy is destroying Amazon wild forests. And Metro is fucking boomin"
          />
          <PinpointCard
            id="9045"
            user={{ full_name: "Theodore Rusevelt" }}
            text="There is a crazy deforestation up here. Coca Cola compamy is destroying Amazon wild forests. And Metro is fucking boomin"
          />
          <PinpointCard
            id="9045"
            user={{ full_name: "Theodore Rusevelt" }}
            text="There is a crazy deforestation up here. Coca Cola compamy is destroying Amazon wild forests. And Metro is fucking boomin"
          />
          <PinpointCard
            id="9045"
            user={{ full_name: "Theodore Rusevelt" }}
            text="There is a crazy deforestation up here. Coca Cola compamy is destroying Amazon wild forests. And Metro is fucking boomin"
          />
          <PinpointCard
            id="9045"
            user={{ full_name: "Theodore Rusevelt" }}
            text="There is a crazy deforestation up here. Coca Cola compamy is destroying Amazon wild forests. And Metro is fucking boomin"
          />
        </ReviewCardList>
      </MapGrid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

const MapGrid = styled.div`
  display: grid;
  column-gap: 50px;
  height: 512px;
  grid-template-columns: 512px auto;
  grid-template-rows: 512px;
`;

const Title = styled.p`
  font-weight: bold;
  color: #fff;
  font-size: 64px;
  text-align: center;
`;

const MapPlaceholder = styled.div`
  width: 512px;
  height: 512px;
  background-color: #a0a0a0;
  border-radius: 10px;
`;

const ReviewCardList = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-right: 20px;

  .aaa333aaa333aaa:first-of-type {
    border: 0px solid #fff !important;
  }

  /* width */
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #525252;
    border-radius: 2px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #b8b8b8;
    border-radius: 2px;
  }
`;

export default MapBlock;
