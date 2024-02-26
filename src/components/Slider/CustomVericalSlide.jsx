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
        <div {...props}>
            <img src="http://placekitten.com/g/100/100" style= {img_slider}/>
        </div>
    )
}
export default CustomVerticalSlide;