import React, { useEffect } from 'react';
import ContextData from "../components/context/ContextData";

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfDownloadButton = ({ generateText }) => {
  const {stateData} = React.useContext(ContextData)
  useEffect(() => {
    // console.log(generateText());
  }, [generateText]);

  const handleDownload = () => {
    const docDefinition = {
      content: generateText(),
    };

    pdfMake.createPdf(docDefinition).download(`${stateData.currentTheme.tema_name}.pdf`);
  };

  return (
       <img
        className="download-img"
        src={process.env.PUBLIC_URL + "/images/download-pdf6.png"}
        onClick={handleDownload}
        alt=""
      />
  );
};

export default PdfDownloadButton;
