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
            <img src={`${process.env.REACT_APP_API_BASE_URL}/${props.image}`} style= {img_slider}/>
        </div>
    )
}
export default CustomSlide;