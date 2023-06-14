import { Redirect  }  from "react-router-dom";
import temeIstoriArray from '../data/temeIstoria';
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from '../components/TitleBox';
import ListSubAccordeon from '../components/Accordeon/ListSubAccordeon';

const Subtema = (props) => {
    if (!props.location || !props.location.state) {
        
        return <Redirect to="/error" /> ; // Возвращаем null или другой компонент-заглушку, если props.location отсутствует
      }
    console.log(props.location.state.list);
    return (
        <Wrapper>
            <Breadcrumb list={props?.location.state.list.breadcrumb} />
            <TitleBox className="teme-container">{props?.location.state.list.name}</TitleBox>
            <ListSubAccordeon teme={temeIstoriArray} subtema={props?.location.state.list}/>
        </Wrapper>
    )
}
export default Subtema;