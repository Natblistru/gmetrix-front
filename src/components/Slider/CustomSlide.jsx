const CustomSlide = (props) => {
    const img_slider = {
        display: 'block',
        width: '90%',
        height: "400px",
        objectFit: 'cover',
        margin: '0 auto',
        outline: 'none',
      };
    return (
        <div {...props}>
            <img src={process.env.PUBLIC_URL +`/images/abstract0${props.index}.jpg`} style= {img_slider}/>
        </div>
    )
}
export default CustomSlide;