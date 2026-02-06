import { Link } from "react-router-dom";

export const TopMenu = () => {
  return (
    <div>
      <nav className="text-3xl font-bold underline">
        <Link to="/">Coding Challenges</Link>
      </nav>
    </div>
  );
};

export default TopMenu;
