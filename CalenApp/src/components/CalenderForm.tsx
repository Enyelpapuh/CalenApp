import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CalendarFormProps = {
    year?: number;
    month?: number;
    onDateSelect?: (date: Date) => void;
};

const Calendar: React.FC<CalendarFormProps> = ({ year, month, onDateSelect }) => {
    const today = new Date();
    const currentYear = year ?? today.getFullYear();
    const currentMonth = month ?? today.getMonth();

    const NameMonth = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [viewMode, setViewMode] = useState<"days" | "months" | "years">("days");
    const [displayYear, setDisplayYear] = useState(currentYear);
    const [displayMonth, setDisplayMonth] = useState(currentMonth);

    const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay();
    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handleSelecDate = (day: number) => {
        const date = new Date(displayYear, displayMonth, day);
        setSelectedDate(date);
        if (onDateSelect) onDateSelect(date);
    };

    const handleMonthSelect = (monthIndex: number) => {
        setDisplayMonth(monthIndex);
        setViewMode("days");
    };

    const handleYearSelect = (year: number) => {
        setDisplayYear(year);
        setViewMode("months");
    };

    const handleHeaderClick = () => {
        if (viewMode === "days") {
            setViewMode("months");
        } else if (viewMode === "months") {
            setViewMode("years");
        } else {
            setViewMode("days");
        }
    };

    const goPrev = () => {
        if (viewMode === "days") {
            setDisplayMonth((prev) => {
                if (prev === 0) {
                    setDisplayYear((y) => y - 1);
                    return 11;
                }
                return prev - 1;
            });
        } else if (viewMode === "months") {
            setDisplayYear((prev) => prev - 1);
        } else {
            setDisplayYear((prev) => prev - 12);
        }
    };

    const goNext = () => {
        if (viewMode === "days") {
            setDisplayMonth((prev) => {
                if (prev === 11) {
                    setDisplayYear((y) => y + 1);
                    return 0;
                }
                return prev + 1;
            });
        } else if (viewMode === "months") {
            setDisplayYear((prev) => prev + 1);
        } else {
            setDisplayYear((prev) => prev + 12);
        }
    };

    return (
        <div className="w-[600px] h-full max-w-md mx-auto border rounded-lg shadow p-4 flex justify-center flex-col h-[400px]">
            {/* Header con navegación */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={goPrev}
                    className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                >
                    ◀
                </button>

                <h3
                    className="text-lg font-bold cursor-pointer select-none"
                    onClick={handleHeaderClick}
                >
                    {viewMode === "days" && `${NameMonth[displayMonth]} ${displayYear}`}
                    {viewMode === "months" && `${displayYear}`}
                    {viewMode === "years" && `${displayYear - 6} - ${displayYear + 5}`}
                </h3>

                <button
                    onClick={goNext}
                    className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                >
                    ▶
                </button>
            </div>

            {/* Contenedor rectangular fijo con animación */}
            <div className="h-full w-full flex items-center justify-center overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {viewMode === "days" && (
                        <motion.div
                            key="days"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            <div className="grid grid-cols-7 text-center font-semibold text-gray-700">
                                {["D", "L", "M", "X", "J", "V", "S"].map((dayName) => (
                                    <div key={dayName} className="p-2">{dayName}</div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center">
                                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                                    <div key={`empty-${i}`} />
                                ))}
                                {daysArray.map((day) => (
                                    <button
                                        key={day}
                                        className={`aspect-square flex items-center justify-center border transition-colors duration-200
                                                ${selectedDate?.getDate() === day &&
                                                selectedDate.getMonth() === displayMonth &&
                                                selectedDate.getFullYear() === displayYear
                                                ? "bg-blue-400 text-white font-bold border-blue-500"
                                                : today.getDate() === day &&
                                                    today.getMonth() === displayMonth &&
                                                    today.getFullYear() === displayYear
                                                    ? "bg-blue-100 text-blue-700 font-semibold border-blue-400"
                                                    : "hover:bg-gray-200 border-gray-300"
                                            }`}
                                        onClick={() => handleSelecDate(day)}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {viewMode === "months" && (
                        <motion.div
                            key="months"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-3 gap-2 w-full"
                        >
                            {NameMonth.map((monthName, idx) => (
                                <button
                                    key={monthName}
                                    className={`h-full w-full border border-gray-300 rounded-md transition-colors duration-200
                    ${displayMonth === idx ? "bg-blue-400 text-white font-bold" : "hover:bg-gray-200"}`}
                                    onClick={() => handleMonthSelect(idx)}
                                >
                                    {monthName.slice(0, 3)}
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {viewMode === "years" && (
                        <motion.div
                            key="years"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-3 gap-2 w-full"
                        >
                            {Array.from({ length: 12 }, (_, i) => displayYear - 6 + i).map((year) => (
                                <button
                                    key={year}
                                    className={`h-full w-full border border-gray-300 rounded-md transition-colors duration-200
                    ${displayYear === year ? "bg-blue-400 text-white font-bold" : "hover:bg-gray-200"}`}
                                    onClick={() => handleYearSelect(year)}
                                >
                                    {year}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Calendar;
