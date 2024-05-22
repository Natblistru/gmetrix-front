const CustomVerticalSlide = (props) => {

    const img_slider = {
        display: 'block',
        width: "100px",
        height: "100px",
        objectFit: 'cover',
        margin: '0 auto',
        outline: 'none',
      };
    return (
        <div {...props} className="card__slide">
            <div className="card__slide__proc">
                <span>{Math.round(props?.evalitem.student_procent)}%</span>
            </div>
            {props?.evalitem.img !== null ? (
                <img
                    src={`${process.env.REACT_APP_API_BASE_URL}/${props?.evalitem.img}`}
                    style={img_slider}
                />
                ) : (
                <img
                src={process.env.PUBLIC_URL + "/images/evaluare.png"}
                    style={img_slider}
                />
                )}
            <div className="overlay_text">
                <div className="text d-flex align-items-end justify-content-between"><span style={{backgroundColor: 'black'}}>Evaluarea № {props.idx}</span></div>
            </div>
        </div>
    )
}
export default CustomVerticalSlide;