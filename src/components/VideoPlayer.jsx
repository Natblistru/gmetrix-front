import React, { forwardRef } from 'react';

const VideoPlayer = forwardRef(({ video, title }, ref) => {
  return (
    <div>
      <iframe
        ref={ref}
        width="100%"
        height="360"
        src={video}
        title={title}
        frameBorder="0"
	      style={{borderBottom: '1px solid #584949'}}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
});

export default VideoPlayer;

