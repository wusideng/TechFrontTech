const BlockC = ({ children, style = null, title = null }) => {
  return (
    <div className="block-content-form" style={style}>
      {children}
    </div>
  );
};

export default BlockC;
