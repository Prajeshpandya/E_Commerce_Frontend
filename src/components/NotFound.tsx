import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container not-found">
      <MdError />
      <Link to={"/"}>
        <h1>Go to Home</h1>
      </Link>
    </div>
  );
}
