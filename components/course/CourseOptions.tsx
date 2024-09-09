import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

type Props = {
    active: number;
    setActive: (active: number) => void;
}

const CourseOptions: FC<Props> = ({ active, setActive }) => {
    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview",
    ];

    const handleNext = () => {
        if (active < options.length - 1) {
            setActive(active + 1);
        }
    };

    const handlePrevious = () => {
        if (active > 0) {
            setActive(active - 1);
        }
    };

    return (
        <div className="mb-8">
            <div className="flex items-center">
                {options.map((step, index) => (
                    <div key={index} className={`${index === 3 ? "flex-0" : "flex-1"}`}>
                        <div className={`flex items-center ${index <= active ? 'text-blue-500' : 'text-gray-900'}`}>
                            <div className="relative flex items-center justify-center w-[34px] h-[34px] md:w-[48px] md:h-[48px] text-[10px] md:text-base rounded-full dark:text-white text-black border-black dark:border-white border-2 md:border-[3px]">
                                {index <= active ? (
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center w-full h-full text-white text-xs md:text-base bg-[#020817] border-none rounded-full"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <FaCheck />
                                    </motion.div>
                                ) : (
                                    <motion.span
                                        className="text-xl"
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                    >
                                        {index + 1}
                                    </motion.span>
                                )}
                            </div>
                            {index < options.length - 1 && (
                                <div className="flex-1 h-[3px] md:h-[6px] bg-white dark:bg-[#020817] rounded-l-md rounded-r-lg mx-1.5 md:mx-4">
                                    <motion.div
                                        className="h-[3px] md:h-[6px] rounded-l-md rounded-r-md bg-[#1D4ED8]"
                                        initial={{ width: 0 }}
                                        animate={{ width: index < active ? '100%' : '0%' }}
                                        transition={{ duration: 0.3 }}
                                    ></motion.div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CourseOptions