const BlockD = ({ title, children, control, style }) => {
  return (
    <div className="block-d" style={style}>
      {control}
      <h3 className="title">{title}</h3>
      {children}
    </div>
  );
};

export default BlockD;
