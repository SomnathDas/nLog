const ReqLabel = ({ iconName, req, color }) => {
  return (
    <div className={`flex gap-2`}>
      <i className={`material-symbols-rounded ${color} `}>{iconName}</i>
      <p className={`text-white`}>{req}</p>
    </div>
  );
};

export default ReqLabel;
