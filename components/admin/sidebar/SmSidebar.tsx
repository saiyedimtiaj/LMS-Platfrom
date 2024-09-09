"use client"
import ThemeSwitcher from '@/app/utils/ThemeSwitcher';
import Link from 'next/link';
import { MdOutlineVerified } from "react-icons/md";
import { FaUsers, FaFileInvoice } from "react-icons/fa";
import { MdOutlineOndemandVideo, MdBarChart } from "react-icons/md";
import { IoIosVideocam } from "react-icons/io";
import { FaChartArea } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import avatarDefault from "../../../public/images/149071.png"
import {
    Home,
    Menu,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useAppSelector } from '@/redux/hooks';
import { usePathname } from 'next/navigation';

const SmSidebar = () => {
    const { user } = useAppSelector(state => state.auth);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const navLinkClasses = (path: string) =>
        `flex items-center gap-2 px-2 py-2 ${isActive(path) ? "bg-blue-600 text-white rounded" : ""}`;

    return (
        <header className="flex justify-between md:justify-end h-14 items-center gap-4 border-b bg-muted/40 dark:bg-[#111C43] px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <div className="flex h-screen overflow-y-scroll scroll-bar flex-col gap-2">
                        <div className="flex items-center px-4 mt-2">
                            <Link href="/" className="block">
                                <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">
                                    EXPO
                                </h3>
                            </Link>
                        </div>
                        <div className='flex items-center flex-col'>
                            <Image
                                alt="profile-user"
                                width={100}
                                height={100}
                                src={user?.avater ? user?.avater?.url : avatarDefault}
                                className='w-[100px] h-[100px] object-cover rounded-full border-4 border-[#5b6fe6]'
                            />
                            <div className='flex items-center gap-2 mt-3'>
                                <h1 className="text-lg font-Josefin font-medium">{user?.name}</h1>
                                <MdOutlineVerified className='text-white' fill='#6061FF' size={20} />
                            </div>
                        </div>
                        <div className="mx-3">
                            <Link href='/admin' className={navLinkClasses('/admin')}>
                                <Home size={20} />
                                <span>Dashboard</span>
                            </Link>
                            <h3 className="text-lg font-medium mt-4 mb-1">Data</h3>
                            <Link href='/admin/users' className={navLinkClasses('/admin/users')}>
                                <FaUsers size={20} />
                                <span>Users</span>
                            </Link>
                            <Link href='/admin/invoices' className={navLinkClasses('/admin/invoices')}>
                                <FaFileInvoice size={20} />
                                <span>Invoices</span>
                            </Link>
                            <h3 className="text-lg font-medium mt-4 mb-1">Content</h3>
                            <Link href='/admin/create-course' className={navLinkClasses('/admin/create-course')}>
                                <IoIosVideocam size={20} />
                                <span>Create Course</span>
                            </Link>
                            <Link href='/admin/courses' className={navLinkClasses('/admin/courses')}>
                                <MdOutlineOndemandVideo size={20} />
                                <span>Live Course</span>
                            </Link>
                            <h3 className="text-lg font-medium mt-4 mb-1">Analytics</h3>
                            <Link href='/admin/course-analytics' className={navLinkClasses('/admin/course-analytics')}>
                                <MdBarChart size={20} />
                                <span>Course Analytics</span>
                            </Link>
                            <Link href='/admin/order-analytics' className={navLinkClasses('/admin/order-analytics')}>
                                <FaChartArea size={20} />
                                <span>Order Analytics</span>
                            </Link>
                            <Link href='/admin/users-analytics' className={navLinkClasses('/admin/users-analytics')}>
                                <FaHistory size={20} />
                                <span>Users Analytics</span>
                            </Link>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <div className='flex items-center'>
                <ThemeSwitcher />
            </div>
        </header>
    );
};

export default SmSidebar;