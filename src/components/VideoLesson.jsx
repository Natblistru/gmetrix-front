import React, { useRef, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import VideoBreakpoints from './VideoBreakpoints';

const VideoLesson = ({ video, title, breakpoints }) => {
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRef = useRef(null);

  const handleBreakpointClick = (seconds) => {
    videoRef.current.src = `${video}?start=${seconds}&autoplay=1&amp;enablejsapi=1`;

    const playerWindow = videoRef.current.contentWindow;
    setTimeout(() => {
      playerWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    }, 500);
  };

  return (
    <div>
      <VideoPlayer ref={videoRef} video={video} title={title} />
      <VideoBreakpoints breakpoints={breakpoints} onBreakpointClick={handleBreakpointClick} />
    </div>
  );
};

export default VideoLesson;
