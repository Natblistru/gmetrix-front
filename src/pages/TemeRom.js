import temeRomana from '../data/temeRomana';
import Breadcrumb from "../components/Breadcrumb";
import Titlu from "../components/Titlu";
import Wrapper from "../components/Wrapper";
import TitleBox from '../components/TitleBox';
import TopicsList from '../components/TopicsList';
import Card from '../components/Card';
import '../index.css';

const TemeRom = () => {
    return (
        <Wrapper className="large">
            <Breadcrumb list={[{name: "Discipline", path: "/"}]}/>
            <Card>
                <Titlu className="titlu-card">Limba Română - pregătire pentru examen clasa 9</Titlu>
                <TitleBox className="teme-container">clasa 9</TitleBox>
                <TopicsList teme={temeRomana}/>
            </Card>
        </Wrapper>
    )
}
export default TemeRom;