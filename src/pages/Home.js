import ListDiscipline from "../components/ListDiscipline";
import Titlu from "../components/Titlu";
import Wrapper from "../components/Wrapper";
import discipline from "../data/discipline";

const Home = () => {
  return (
    <Wrapper>
      <Titlu>Disciplinele de absolvire a cursului gimnazial</Titlu>
      <ListDiscipline list={discipline} />
    </Wrapper>
  );
};
export default Home;
