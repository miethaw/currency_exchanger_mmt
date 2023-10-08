import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

<Skeleton />;

const SkeletonLoading = () => {
  return (
    <div className="bg-primary/[0.9] animate-pulse backdrop-blur-md items-center my-2  text-white border-cyan-500 rounded-lg">
      <div
        className="flex items-center py-2 border-secondry"
        style={{ borderBottomWidth: 1 }}
      >
        <div className="w-1/2">
          <p className="text-sm text-textSecondry">Date</p>
        </div>
        <div className="w-1/2 ">
          <p className="text-sm text-textSecondry">From</p>
        </div>
        <div className="w-1/2 ">
          <p className="text-sm text-textSecondry">To</p>
        </div>
      </div>
      <div className="flex items-center py-2">
        <div className="w-1/2"></div>
        <div className="w-1/2"></div>
        <div className="w-1/2">
          <p className="text-md  text-textPrimary h-10"></p>
        </div>
      </div>
    </div>
  );
};
export default SkeletonLoading;
