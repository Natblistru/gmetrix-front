const ItemText = (props) => {
  const classes = "subjects-container " + props.className;
  let classesChild = "text-block " ; 
  if (props.classNameChild!==null) classesChild = classesChild + props.classNameChild;
  return (
    <div className={classes}>
      <div className={classesChild}>
        {props.children}
      </div>
    </div>
  );
};
export default ItemText;
