import temeIstoriArray from '../data/temeIstoria';
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from '../components/TitleBox';
import ListSubAccordeon from '../components/Accordeon/ListSubAccordeon';

const Subtema = () => {
    return (
        <Wrapper>
            <Breadcrumb list={temeIstoriArray[0].subtitles[0].subjects[0].breadcrumb} />
            <TitleBox className="teme-container">{temeIstoriArray[0].subtitles[0].subjects[0].name}</TitleBox>
            <ListSubAccordeon teme={temeIstoriArray}/>
        </Wrapper>
    )
}
export default Subtema;