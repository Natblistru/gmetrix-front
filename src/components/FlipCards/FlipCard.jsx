import "./flipCards.css";
import { Link } from 'react-router-dom';

const FlipCard = (props) => {
    const classColor = props.textColor;
  return (
    <section className="card-section">
      <div className="cardFlip">
        <div className="flip-card">
          <div className="flip-card__container">
            <div className="card-front">
              <div className={`card-front__tp card-front__tp${classColor}`}>

                <h2 className="card-front__heading">{props.anul}</h2>
                <p className="card-front__text-price"></p>
              </div>

              <div className="card-front__bt">
                <p className={`card-front__text-view card-front__text-view${classColor}`}>
                    Vezi răspunsul
                </p>
              </div>
            </div>
            <div className="card-back">
              {/* <video className="video__container" autoplay muted loop>
                <source
                  className="video__media"
                  src="https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47bbd6992dd6c1c&profile_id=139&oauth2_token_id=57447761"
                  type="video/mp4"
                />
              </video> */}
              <img src={process.env.PUBLIC_URL +props.img} className="video__container"/>

            </div>
          </div>
        </div>

        <div className="inside-page">
          <div className="inside-page__container">
            <h3 className={`inside-page__heading inside-page__heading${classColor}`}>
            {props.anul}
            </h3>
            <p className="inside-page__text">
            {props.eveniment}
            </p>
            <Link to={props.detaliiPath} className={`inside-page__btn inside-page__btn${classColor}`}>
            
              Vezi detalii
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FlipCard;
