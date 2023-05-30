const DiagramItem = (props) => {
  const funcModal = (e) => {
    props.onClick(e.target.textContent);
    e.stopPropagation();
  }
    return (
      <li onClick={(e) => funcModal(e)}>
        <code>{props.text}</code>
        {props.children.length > 0 && <ul>{props.children}</ul>}
      </li>
    );
  };
  export default DiagramItem;