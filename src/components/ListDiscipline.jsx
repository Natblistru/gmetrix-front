import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import meter1 from "../assets/img/meter1.svg";

const ListDiscipline = () => {
  const disciplineAniState = useSelector((state) => state.disciplineAni);

  const disciplineAni = Array.isArray(disciplineAniState)
    ? disciplineAniState
    : [];

  const authName = localStorage.getItem("auth_name");

  return (
    <div className="manuale-container skill-bx">
      {/* {disciplineAni.map((item) => {
        const nivelStudiu = item.study_level_id === 1 ? "examen clasa 9" : "BAC";
        const clasa = item.study_level_id === 1 ? "clasa 9" : "clasa 12";
        const name = item.name ? item.name.split(",")[0] : "";

        return (
          <div className="manual-item" key={item.id}>
            <Link
              to={`/capitole/${item.subject_id}?level=1&year=2022&name=${name}&nivel=${nivelStudiu}&clasa=${clasa}`}
            >
              <img src={process.env.PUBLIC_URL + item.img} alt="" />
              <img src={meter1} alt="Image" className="img-svg" />
              <p>{item.name}</p>
            </Link>
          </div>
        );
      })} */}

      {true && (
        <>
          <div className="manual-item">
            <Link to="/capitole_gama/1?level=1&year=2022&name=Database&nivel=examen clasa 9&clasa=clasa 9">
              <img src={process.env.PUBLIC_URL + "/images/database.jpg"} alt="" />
              <img src={meter1} alt="Image" className="img-svg" />
              <p>Database, <br /><br />MTA 98-364 Exam</p>
            </Link>
          </div>

          <div className="manual-item">
            <Link to="/capitole_gama/2?level=1&year=2022&name=Javascript&nivel=examen clasa 9&clasa=clasa 9">
              <img src={process.env.PUBLIC_URL + "/images/javascript.jpg"} alt="" />
              <img src={meter1} alt="Image" className="img-svg" />
              <p>JavaScript, <br /><br />MTA 98-382 Exam</p>
            </Link>
          </div>
          <div className="manual-item">
            <Link to="/capitole_gama/3?level=1&year=2022&name=Networking&nivel=examen clasa 9&clasa=clasa 9">
              <img src={process.env.PUBLIC_URL + "/images/networking.jpg"} alt="" />
              <img src={meter1} alt="Image" className="img-svg" />
              <p>Networking, <br /><br />MTA 98-366 Exam</p>
            </Link>
          </div>
          <div className="manual-item">
            <Link to="/capitole_gama/4?level=1&year=2022&name=Device&nivel=examen clasa 9&clasa=clasa 9">
              <img src={process.env.PUBLIC_URL + "/images/device.jpg"} alt="" />
              <img src={meter1} alt="Image" className="img-svg" />
              <p>Device, <br /><br />MTA 98-368 Exam</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ListDiscipline;