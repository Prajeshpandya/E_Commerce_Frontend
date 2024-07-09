export default function Loader() {
  return <div>Loading...</div>;
}

export function SkeletonLoader({
  width = "unset",
  length = 3,
}: {
  width?: string;
  length: number;
}) {
  const skeletons = Array.from({ length }, (_, idx) => (
    <div key={idx} className="skeleton_shape"></div>
  ));
  return (
    <div className="skeleton_loader" style={{ width }}>
      {skeletons}
    </div>
  );
}
