const Audio = (props) => {
  return (
    <div className="audio">
      <audio
        src={`${process.env.REACT_APP_API_BASE_URL}/${props.path}`}
        preload="none"
        controls="controls"
      ></audio>
    </div>
  );
};
export default Audio;
