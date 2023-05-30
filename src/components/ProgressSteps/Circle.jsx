import './progressSteps.css';

const Circle = (props) => {
    const classes = " circle "+ props.className
    return (
        <div className={classes} onClick={props.onClick}>{props.index}</div>
    )
}
export default Circle;