const Notification = ({ msg, color }) => {
  return (
    <div
      className={`absolute md:top-10 md:right-12 top-10 ${color} md:pr-12 md:pl-12 md:pt-6 md:pb-6 pl-4 pr-4 pt-5 pb-5 flex gap-4 justify-center items-center`}
    >
      <i className={`material-symbols-rounded`}>Notifications</i>
      <p className={`text-sm`}>{msg}</p>
    </div>
  );
};

export default Notification;
