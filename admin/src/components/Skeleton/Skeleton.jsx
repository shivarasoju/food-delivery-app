import "./Skeleton.css";

const Skeleton = ({ count = 5 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="list-table-format skeleton-row">
            <div className="skeleton image"></div>
            <div className="skeleton box"></div>
            <div className="skeleton box"></div>
            <div className="skeleton box"></div>
            <div className="skeleton box small"></div>
          </div>
        ))}
    </>
  );
};

export default Skeleton;
