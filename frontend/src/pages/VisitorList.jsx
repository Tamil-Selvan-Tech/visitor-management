import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    FaUser,
    FaPhoneAlt,
    FaHome,
    FaClock,
    FaSignOutAlt,
    FaSearch,
    FaFilter
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function VisitorList() {
    const [visitors, setVisitors] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const loadData = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/visitors`);
        setVisitors(res.data);
    };

    const exitVisitor = async (id) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/visitors/exit/${id}`);
            toast.info("Visitor Exited!");
            loadData();
        } catch (error) {
            toast.error("Exit failed");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredVisitors = visitors.filter((v) => {
        const searchText =
            v.name.toLowerCase().includes(search.toLowerCase()) ||
            v.phone.includes(search) ||
            v.flatNumber.toLowerCase().includes(search.toLowerCase());

        const statusMatch = filter === "All" || v.status === filter;

        return searchText && statusMatch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-violet-100 px-3 sm:px-6 py-4">

            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-teal-700 text-center"
            >
                Visitor List
            </motion.h2>

            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 justify-between">

                <div className="relative w-full md:w-1/2">
                    <FaSearch className="absolute left-3 top-3 text-teal-600" />
                    <input
                        className="w-full pl-10 p-2 rounded-lg 
                        border focus:ring-2 focus:ring-teal-400 outline-none"
                        placeholder="Search by name, phone or flat..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl shadow-md justify-center">
                    {["All", "Entered", "Exited"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition-all duration-300
        ${filter === status
                                    ? status === "Entered"
                                        ? "bg-emerald-500 text-white shadow-lg"
                                        : status === "Exited"
                                            ? "bg-rose-500 text-white shadow-lg"
                                            : "bg-violet-600 text-white shadow-lg"
                                    : "bg-gray-100 text-gray-600 hover:bg-teal-100"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="overflow-x-auto bg-white rounded-xl shadow-xl"
            >
                <table className="min-w-[800px] w-full text-sm text-gray-700">
                    <thead className="bg-gradient-to-r from-teal-600 to-violet-600 text-white">
                        <tr>
                            <th className="p-3 text-left"><FaUser className="inline mr-2" />Name</th>
                            <th className="p-3"><FaPhoneAlt className="inline mr-2" />Phone</th>
                            <th className="p-3"><FaHome className="inline mr-2" />Flat</th>
                            <th className="p-3">Purpose</th>
                            <th className="p-3"><FaClock className="inline mr-2" />Entry</th>
                            <th className="p-3"><FaClock className="inline mr-2" />Exit</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredVisitors.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center p-4 text-gray-500">
                                    No visitors found
                                </td>
                            </tr>
                        )}

                        {filteredVisitors.map((v, i) => (
                            <motion.tr
                                key={v._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="border-b hover:bg-teal-50"
                            >
                                <td className="p-2 sm:p-3 capitalize font-semibold text-teal-700">{v.name}</td>
                                <td className="p-2 sm:p-3 text-center">{v.phone}</td>
                                <td className="p-2 sm:p-3 text-center">{v.flatNumber}</td>
                                <td className="p-2 sm:p-3 text-center">{v.purpose}</td>
                                <td className="p-2 sm:p-3 text-center">
                                    {new Date(v.entryTime).toLocaleTimeString()}
                                </td>
                                <td className="p-2 sm:p-3 text-center">
                                    {v.exitTime
                                        ? new Date(v.exitTime).toLocaleTimeString()
                                        : "-"}
                                </td>
                                <td className="p-2 sm:p-3 text-center">
                                    <motion.span
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${v.status === "Entered"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-rose-100 text-rose-700"
                                            }`}
                                    >
                                        {v.status}
                                    </motion.span>
                                </td>
                                <td className="p-2 sm:p-3 text-center">
                                    {v.status === "Entered" && (
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => exitVisitor(v._id)}
                                            className="bg-rose-500 text-white px-3 py-1 rounded-lg flex items-center gap-2 justify-center mx-auto hover:bg-rose-600"
                                        >
                                            <FaSignOutAlt /> Exit
                                        </motion.button>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
}