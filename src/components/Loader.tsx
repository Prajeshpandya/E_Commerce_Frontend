export default function Loader() {
  return <div>Loading...</div>;
}

export function SkeletonLoader({ width = "unset" }: { width?: string }) {
  return (
    <div className="skeleton_loader" style={{ width }}>
      <div className="skeleton_shape"></div>
      <div className="skeleton_shape"></div>
      <div className="skeleton_shape"></div>
    </div>
  );
}
