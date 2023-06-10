import { useParams } from 'react-router-dom'; 
import temeIstoriArray from '../data/temeIstoria';
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from '../components/TitleBox';
import ListAccordeon from '../components/Accordeon/ListAccordeon';
import '../index.css'

const Tema = () => {
    const { address } = useParams();
    console.log("address", address);
    return (
        <Wrapper>
            <Breadcrumb list={temeIstoriArray[0].subtitles[0].breadcrumb} />
            <TitleBox className="teme-container">{temeIstoriArray[0].subtitles[0].name}</TitleBox>
            <ListAccordeon teme={temeIstoriArray}/>
        </Wrapper>
    )
}
export default Tema;