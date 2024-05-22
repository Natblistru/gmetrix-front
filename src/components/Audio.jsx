const Audio = (props) => {
  console.log('process.env.REACT_APP_API_BASE_URL',process.env.REACT_APP_API_BASE_URL)
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
