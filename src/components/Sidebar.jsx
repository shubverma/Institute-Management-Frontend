import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, BookOpen, DollarSign, Menu, Users } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-gray-800 text-white h-screen p-5 transition-all ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="mb-5 text-xl">
        <Menu />
      </button>
      <ul className="space-y-4">
        <li>
          <Link
            to="/home"
            className="flex items-center space-x-2 hover:text-gray-400"
          >
            <Home />
            {isOpen && <span>Home</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/students"
            className="flex items-center space-x-2 hover:text-gray-400"
          >
            <Users />
            {isOpen && <span>Students</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/courses"
            className="flex items-center space-x-2 hover:text-gray-400"
          >
            <BookOpen />
            {isOpen && <span>Courses</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/feeSubmissions"
            className="flex items-center space-x-2 hover:text-gray-400"
          >
            <DollarSign />
            {isOpen && <span>Fees Submission</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
