const Audio = (props) => {
  return (
    <div className="audio">
      <audio
        src={process.env.PUBLIC_URL +props.path}
        preload="none"
        controls="controls"
      ></audio>
    </div>
  );
};
export default Audio;
