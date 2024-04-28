import styled from "styled-components";
import Cover from "../components/Cover";
import Header from "../components/Header/Header";
import ChangingTextBlock from "../modules/ChangingTextBlock/ChangingTextBlock";
import StatisticsBlock from "../modules/StatisticsBlock/StatisticsBlock";
import MapBlock from "../modules/MapBlock/MapBlock";

const Slavik = () => {
  return (
    <PageLayout>
      <Header />
      <Content>
        <ChangingTextBlock />
        <StatisticsBlock />
        <MapBlock />
      </Content>
    </PageLayout>
  );
};

const PageLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #000;

  & {
    font-family: "Open Sauce Sans", sans-serif;
  }
`;

const Content = styled.div`
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  row-gap: 100px;
`;

export default Slavik;
