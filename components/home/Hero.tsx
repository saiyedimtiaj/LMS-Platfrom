"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaReact, FaNodeJs, FaJsSquare, FaDatabase, FaHtml5, FaCss3Alt } from "react-icons/fa";

const Hero = () => {
    return (
        <div className="h-[calc(100vh-80px)] w-full relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 h-full w-full dark:bg-[#080B11] bg-white">
                <div className="absolute bottom-0 left-0 right-0 top-0 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[size:14px_24px] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            </div>
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-[#080B11] bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            <div className="relative z-20 flex flex-col items-center text-center py-8">
                {/* Heading */}
                <h1 className="text-black font-bold font-Josefin dark:text-white md:text-5xl lg:text-7xl text-4xl">
                    Transform Your Knowledge
                </h1>

                {/* Subheading */}
                <p className="text-[#5A5B62] text-sm md:text-base lg:text-xl font-medium max-w-[770px]">
                    Access High-Quality Educational Resources, Interactive Learning Modules, and Collaborative Tools to Enhance Knowledge and Achieve Goals on EXPO
                </p>

                {/* Button */}
                <Link href="/courses">
                    <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2.5 bg-[#0070f3] rounded-md text-white font-medium transition duration-200 ease-linear flex items-center gap-x-2 mt-6">
                        Get Started
                        <ArrowRight size={20} />
                    </button>
                </Link>
            </div>

            {/* Icons in Circular Pattern */}
            <div className="absolute hidden z-10 w-[690px] h-[370px] lg:w-[900px] lg:h-[500px] md:flex items-center justify-center">
                {/* Top Center Icon */}
                <motion.div
                    className="absolute"
                    style={{ top: "5%", left: "50%", }}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                >
                    <FaReact size={40} color="#61DBFB" />
                </motion.div>

                {/* Bottom Center Icon */}
                <motion.div
                    className="absolute"
                    style={{ bottom: "5%", left: "50%", transform: "translateX(-50%)" }}
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <FaNodeJs size={40} color="#68A063" />
                </motion.div>

                {/* Left Center Icon */}
                <motion.div
                    className="absolute"
                    style={{ top: "50%", left: "5%", transform: "translateY(-50%)" }}
                    animate={{ x: [-5, 5, -5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                >
                    <FaJsSquare size={40} color="#F7DF1E" />
                </motion.div>

                {/* Right Center Icon */}
                <motion.div
                    className="absolute"
                    style={{ top: "50%", right: "5%", transform: "translateY(-50%)" }}
                    animate={{ x: [-5, 5, -5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                >
                    <FaDatabase size={40} color="#4DB33D" />
                </motion.div>

                {/* Top Left Icon */}
                <motion.div
                    className="absolute"
                    style={{ top: "20%", left: "20%" }}
                    animate={{ y: [-5, 5, -5], rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <FaHtml5 size={30} color="#E34C26" />
                </motion.div>

                {/* Top Right Icon */}
                <motion.div
                    className="absolute"
                    style={{ top: "20%", right: "20%" }}
                    animate={{ y: [-5, 5, -5], rotate: [0, -20, 20, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <FaCss3Alt size={30} color="#1572B6" />
                </motion.div>

                {/* Bottom Left Icon */}
                <motion.div
                    className="absolute"
                    style={{ bottom: "20%", left: "20%" }}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                >
                    <FaReact size={30} color="#61DBFB" />
                </motion.div>

                {/* Bottom Right Icon */}
                <motion.div
                    className="absolute"
                    style={{ bottom: "20%", right: "20%" }}
                    animate={{ y: [-5, 5, -5], rotate: [0, -20, 20, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <FaNodeJs size={30} color="#68A063" />
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
