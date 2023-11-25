import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import temeIstoriArray from "../data/temeIstoria";
import temeMatemArray from "../data/temeMatem";
import temeRomanaArray from "../data/temeRomana";
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/TitleBox";
import ListSubAccordeon from "../components/Accordeon/ListSubAccordeon";

const Subtema = ({results})  => {
  const { address1, disciplina } = useParams();
  const [item, setItem] = useState(null);
  // console.log("address1", address1);

  const history = useHistory();
  let teme;
  if(disciplina == "istoria") {
    teme = temeIstoriArray;
  } else if(disciplina == "matem") {
    teme = temeMatemArray;    
  } else if(disciplina == "romana") {
    teme = temeRomanaArray;    
  }
  function findObjectWithAddress(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        const found = findObjectWithAddress(obj[key]);
        if (found) {
          return found;
        }
      } else if (key === "addressSubject" && obj[key] === "/" + address1) {
        return obj;
      }
    }
    return null;
  }

  useEffect(() => {
    const foundItem = findObjectWithAddress(teme);
    if (foundItem) {
      setItem(foundItem);
    } else {
      history.push("/error");
    }
  }, []);

  return (
    <Wrapper>
      {item && (
        <>
          <Breadcrumb step={2} />
          <TitleBox className="teme-container" subjectId={item.id}>{item.name}</TitleBox>
          <ListSubAccordeon teme={teme} subtema={item}/>
        </>
      )}
    </Wrapper>
  );
};


export default Subtema;
