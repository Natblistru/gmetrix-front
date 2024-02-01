import React from 'react';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfDownloadButton = ({ generateText }) => {
  const handleDownload = () => {
    const docDefinition = {
      content: generateText(),
    };

    pdfMake.createPdf(docDefinition).download('document.pdf');
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
