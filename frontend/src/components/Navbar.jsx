import { Link, useLocation } from "react-router-dom";
import { FaUserPlus, FaListAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Navbar() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 backdrop-blur-md shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-col sm:flex-row justify-between items-center gap-2">

        {/* Logo */}
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-base sm:text-xl font-extrabold tracking-wide text-white"
        >
          VISITOR MANAGEMENT
        </motion.h1>

        {/* Links */}
        <div className="flex gap-2 sm:gap-5">

          <NavItem to="/" icon={<FaUserPlus />} text="Add Visitor" active={location.pathname === "/"} />

          <NavItem to="/list" icon={<FaListAlt />} text="Visitor List" active={location.pathname === "/list"} />

        </div>
      </div>
    </motion.nav>
  );
}

/* Nav Item */
function NavItem({ to, icon, text, active }) {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`relative px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 font-semibold text-sm sm:text-base transition-all duration-300
          ${active
            ? "bg-white text-teal-700 shadow-lg"
            : "text-white hover:bg-white/20"
          }`}
      >
        {icon}
        <span className="hidden xs:inline sm:inline">{text}</span>

        {active && (
          <motion.span />
        )}
      </motion.div>
    </Link>
  );
}