"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineUserCircle, HiOutlineX } from "react-icons/hi";
import Image from "next/image";
import avater from "../../public/images/149071.png";
import { motion } from "framer-motion";
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import NavItems from "./NavItems";
import LoginModal from "../dialog/LoginModal";
import RegisterModel from "../dialog/RegisterModel";
import VerifyModel from "../dialog/VerifyModel";
import { useLoadUserQuery } from "@/redux/feature/api/apiSlice";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";


const Header = () => {
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const { isLoading } = useLoadUserQuery(undefined);
    const { user } = useAppSelector(state => state.auth);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleScroll = () => {
                if (window.scrollY > 80) {
                    setActive(true);
                } else {
                    setActive(false);
                }
            };

            window.addEventListener("scroll", handleScroll);

            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, []);


    return (
        <>
            <div className="w-full relative">
                <div
                    className={`${active
                        ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                        : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
                        }`}
                >
                    <div className="w-[95%] md:w-[92%] m-auto py-2 h-full">
                        <div className="w-full h-[80px] flex items-center justify-between p-3">
                            <div>
                                <Link href={"/"} onClick={() => setOpenSidebar(false)} className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                                    EXPO
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <NavItems isMobile={false} setOpenSidebar={setOpenSidebar} />
                                <ThemeSwitcher />
                                <div className="md:hidden mr-3">
                                    {openSidebar ? (
                                        <HiOutlineX
                                            size={25}
                                            className="cursor-pointer dark:text-white text-black transition-colors duration-300 hover:text-gray-500"
                                            onClick={() => setOpenSidebar(false)}
                                        />
                                    ) : (
                                        <HiOutlineMenuAlt3
                                            size={25}
                                            className="cursor-pointer dark:text-white text-black transition-colors duration-300 hover:text-gray-500"
                                            onClick={() => setOpenSidebar(true)}
                                        />
                                    )}
                                </div>
                                {isLoading ? '' : user ? (
                                    <Link href={"/profile"}>
                                        <Image
                                            src={user?.avater ? user?.avater?.url : avater}
                                            alt=""
                                            width={30}
                                            height={30}
                                            className="w-[30px] h-[30px] rounded-full cursor-pointer object-cover"
                                        />
                                    </Link>
                                ) : (
                                    <Link href="/signin">
                                        <Button size="sm" >LogIn</Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: openSidebar ? 0 : "110%" }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="z-[999999] rounded-md fixed top-[90px] mx-5 flex flex-col left-0 right-0 backdrop-filter backdrop-blur-xl dark:bg-opacity-70 dark:bg-[#0C0624] bg-white shadow-lg bg-clip-padding bg-opacity-60 border border-gray-200 dark:border-none"
                    >
                        <NavItems isMobile={true} setOpenSidebar={setOpenSidebar} />
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Header;
