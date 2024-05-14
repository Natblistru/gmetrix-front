import React from 'react';

const Presentation = ({ source, title }) => {

  return (
    <div>
      {/* <VideoPlayer ref={videoRef} video={video} title={title} />
      <VideoBreakpoints breakpoints={breakpoints} onBreakpointClick={handleBreakpointClick} /> */}
      <iframe src={source} frameBorder="0" width="100%" height="500" allowFullScreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style={{marginBottom: '-4px'}}></iframe>
    
    </div>
  );
};

export default Presentation;
