const Card = (props) => {
    return (
        <div className="manuale">
            <h2>{props.title}</h2>
            <div className="manuale-container">
                {props.children}
            </div>
        </div>
    )
}
export default Card;