import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfDownloadButton = ({ generateText }) => {
  const currentTheme = useSelector(state => state.currentTheme);

  useEffect(() => {
    // console.log(generateText());
  }, [generateText]);

  const handleDownload = () => {
    const docDefinition = {
      content: generateText(),
    };

    pdfMake.createPdf(docDefinition).download(`${currentTheme.tema_name}.pdf`);
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
