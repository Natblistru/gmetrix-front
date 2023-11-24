import { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import temeIstoriArray from "../data/temeIstoria";
import temeMatemArray from "../data/temeMatem";
import temeRomanaArray from "../data/temeRomana";
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/TitleBox";
import ListAccordeon from "../components/Accordeon/ListAccordeon";
import "../index.css";

const Tema = () => {
  const { address, disciplina } = useParams();
  const location = useLocation();
  
  const [item, setItem] = useState(null);
//  console.log(disciplina);
  const history = useHistory();
  let teme;
  if(disciplina == "istoria") {
    teme = temeIstoriArray;
  } else if(disciplina == "matem") {
    teme = temeMatemArray;    
  } else if(disciplina == "romana") {
    teme = temeRomanaArray;    
  }
  //console.log(teme);

  function findObjectWithAddress(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        const found = findObjectWithAddress(obj[key]);
        if (found) {
          return found;
        }
      } else if (key === "address" && obj[key] === "/" + address) {
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const program = searchParams.get("program");
    const teacher = searchParams.get("teacher");

    console.log("Parametrul program:", program);
    console.log("Parametrul teacher:", teacher);
  }, [location.search]);

  return (
    <Wrapper>
      {item && (
        <>
          <Breadcrumb list={item.breadcrumb} />
          {console.log(item.breadcrumb)}
          <TitleBox className="teme-container" subtitleId={item.id} teme={teme}>{item.name}</TitleBox>
          <ListAccordeon teme={item} />
        </>
      )}
    </Wrapper>
  );
};
export default Tema;
