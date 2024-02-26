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
                <span>70%</span>
            </div>
            <img src="http://placekitten.com/g/100/100" style= {img_slider}/>
            <div class="overlay_text">
                <div class="text d-flex align-items-end justify-content-between"><span>Evaluare suplimentra 2017</span></div>
            </div>
        </div>
    )
}
export default CustomVerticalSlide;