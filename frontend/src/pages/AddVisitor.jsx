import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import {
    FaUser,
    FaPhoneAlt,
    FaHome,
    FaClipboardList,
    FaClock
} from "react-icons/fa";

export default function AddVisitor() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        flatNumber: "",
        purpose: ""
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.purpose.trim()) {
            toast.error("Purpose is required!");
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/visitors/add`, form);
            toast.success("Visitor Added Successfully!");
            setForm({ name: "", phone: "", flatNumber: "", purpose: "" });
        } catch (error) {
            toast.error("Failed to add visitor");
        }
    };

    const time = new Date().toLocaleTimeString();

    return (
        <div className="max-h-screen flex justify-center items-center 
        bg-gradient-to-br from-teal-100 via-cyan-100 to-violet-200 animate-fadeIn">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 m-2 rounded-2xl shadow-2xl w-[420px] "
            >
                <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
                    Visitor Entry Form
                </h2>

                {/* Name */}
                <div className="relative mb-3">
                    <FaUser className="absolute left-3 top-3 text-teal-600" />
                    <input
                        className="w-full pl-10 p-2 border rounded-lg capitalize
                         outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="Visitor Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Phone */}
                <div className="relative mb-3">
                    <FaPhoneAlt className="absolute left-3 top-3 text-violet-600" />
                    <input
                        className="w-full pl-10 p-2 border rounded-lg 
                        outline-none focus:ring-2 focus:ring-violet-400"
                        placeholder="Phone Number"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Flat */}
                <div className="relative mb-3">
                    <FaHome className="absolute left-3 top-3 text-cyan-600" />
                    <input
                        className="w-full pl-10 p-2 border rounded-lg
                         outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="Flat Number"
                        name="flatNumber"
                        value={form.flatNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Purpose */}
                <div className="relative mb-3">
                    <FaClipboardList className="absolute left-3 top-3 text-rose-600" />
                    <input
                        className="w-full pl-10 p-2 border rounded-lg outline-none
                         focus:ring-2 focus:ring-rose-400"
                        placeholder="Purpose of Visit"
                        name="purpose"
                        value={form.purpose}
                        onChange={handleChange}
                    />
                </div>

                {/* Entry Time */}
                <div className="relative mb-3">
                    <FaClock className="absolute left-3 top-3 text-gray-500" />
                    <input
                        className="w-full pl-10 p-2 border rounded-lg
                         outline-none bg-gray-100"
                        value={time}
                        disabled
                    />
                </div>

                {/* Status */}
                <div className="mb-4">
                    <input
                        className="w-full p-2 border rounded-lg bg-emerald-100
                         outline-none text-center text-emerald-700 font-semibold"
                        value="Entered"
                        disabled
                    />
                </div>

                <button className="w-full bg-gradient-to-r from-teal-500 to-violet-600
                 text-white text-xl font-semibold uppercase py-1.5 rounded-lg hover:from-teal-600 hover:to-violet-700">
                    Submit
                </button>
            </form>
        </div>
    );
}