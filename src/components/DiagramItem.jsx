const DiagramItem = (props) => {
    return (
      <li>
        <code>{props.text}</code>
        {props.children.length > 0 && <ul>{props.children}</ul>}
      </li>
    );
  };
  export default DiagramItem;