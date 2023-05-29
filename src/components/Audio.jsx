const Audio = (props) => {
  return (
    <div className="audio">
      <audio
        src={process.env.PUBLIC_URL +'/sound/audio-joiner1_31.mp3'}
        preload="none"
        controls="controls"
      ></audio>
    </div>
  );
};
export default Audio;
