import "./Error.css"

const Error = () => {
  return (
    <div className="error-page-container">
      <div className="error-page-content text-center">
        <div id="speech-bubble" className="bounce">
          <span>
            <span className="pull-left">4</span>
            <div className="emoji  emoji--sad">
              <div className="emoji__face">
                <div className="emoji__eyebrows"></div>
                <div className="emoji__eyes"></div>
                <div className="emoji__mouth"></div>
              </div>
            </div>
            <span className="pull-left">4</span>
          </span>
        </div>
        <h1>Page not Found</h1>
        <p>
          This page doesn't exist on our site. Go back to the{" "}
          <a href="">Home Page.</a>{" "}
        </p>
      </div>
    </div>
  );
};
export default Error;
