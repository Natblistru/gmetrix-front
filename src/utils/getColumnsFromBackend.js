import temeIstoriArray from "../data/temeIstoria";
import { v4 as uuidv4 } from "uuid";

const getColumnsFromBackend = (testID) => {
  let columnsFromBackendNext = null;
  temeIstoriArray[0].subtitles[0].subjects[0].teste.forEach(test => {

    if(test.id==testID&&test.coloane.length) {

      const itemsFromBackendNext = [];
        test.quizArray[0].answers.forEach((answer) => {
          itemsFromBackendNext.push({ id: uuidv4(), content: answer.text });
        });
    
        columnsFromBackendNext = test.coloane.reduce((columns, name) => {
          columns[uuidv4()] = {
            name: name,
            items: []
          };
          return columns;
        }, {});
    
        const columnIds = Object.keys(columnsFromBackendNext);
        columnsFromBackendNext[columnIds[0]].items = itemsFromBackendNext;
        
        // console.log(test.id, columnsFromBackendNext);
    }
  })
  return columnsFromBackendNext;
}
export default getColumnsFromBackend;