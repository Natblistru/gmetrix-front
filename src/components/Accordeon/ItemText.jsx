const ItemText = (props) => {
  const classes = "subjects-container " + props.className;
  return (
    <div className={classes}>
      <div className="text-block">
        {props.children}
      </div>
    </div>
  );
};
export default ItemText;
