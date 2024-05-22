const CustomVericalTestsSlide = (props) => {
    const img_slider = {
        display: 'block',
        width: "100px",
        height: "80px",
        objectFit: 'cover',
        margin: '0 auto',
        outline: 'none',
      };

    const imagePaths = {
        check: "/images/Check.png",
        quiz: "/images/quiz.png",
        words: "/images/words.png",
        snap: "/images/quiz.png",
        dnd: "/images/group.png",
        dnd_chrono: "/images/order.png",
        dnd_chrono_double: "/images/order3.png",
        dnd_group: "/images/group3.png",
    };

    // console.log(props?.evalitem.type)
    
    const imagePath = imagePaths[props?.evalitem.type];
    return (
        <div {...props} className="card__slide">
            <div className="card__slide__proc">
                <span>{Math.round(props?.evalitem.student_procent)}%</span>
            </div>
            <img
                className="toolPreviewImage"
                style={img_slider}
                src={`${process.env.REACT_APP_API_BASE_URL}/${imagePath}`}
                alt=""
            />
            <div className="overlay_text">
                <div className="text d-flex align-items-end justify-content-between"><span style={{backgroundColor: 'black'}}>Test № {props.idx}</span></div>
            </div>
        </div>
    )
}
export default CustomVericalTestsSlide;