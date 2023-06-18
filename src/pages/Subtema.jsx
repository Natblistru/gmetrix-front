import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import temeIstoriArray from "../data/temeIstoria";
import Breadcrumb from "../components/Breadcrumb";
import Wrapper from "../components/Wrapper";
import TitleBox from "../components/TitleBox";
import ListSubAccordeon from "../components/Accordeon/ListSubAccordeon";

const Subtema = () => {
  const { address1 } = useParams();
  const [item, setItem] = useState(null);
  // console.log("address1", address1);
  const history = useHistory();

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
    const foundItem = findObjectWithAddress(temeIstoriArray);
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
          <Breadcrumb list={item.breadcrumb} />
          <TitleBox className="teme-container">{item.name}</TitleBox>
          <ListSubAccordeon teme={temeIstoriArray} subtema={item} />
        </>
      )}
    </Wrapper>
  );
};
export default Subtema;
