"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import profileImg from '../../public/images/149071.png';
import { RiProfileLine, RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { MdLogout, MdSpaceDashboard } from "react-icons/md";
import { useAppSelector } from '@/redux/hooks';
import { toast } from 'sonner';
import { useLogOutMutation } from '@/redux/feature/auth/authApi';

const ProfileSidebar = () => {
    const pathname = usePathname();
    const { user } = useAppSelector(state => state.auth)
    const router = useRouter()
    const [logOut, { isSuccess, data }] = useLogOutMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message)
            router.push('/')
        }
    }, [data, router, isSuccess])

    const logoutHandler = async () => {
        await logOut(undefined)
    }

    const linkStyles = "flex items-center gap-1 py-1.5 px-2 rounded mx-2";
    const activeLinkStyles = "dark:bg-blue-500 bg-gray-200 dark:text-white dark:bg-blue-700 dark:text-white";

    return (
        <div className="border rounded-lg h-[400px] md:w-[230px] dark:bg-gray-800 dark:border-gray-700">
            <div className="pb-5">
                <div className="hidden md:flex justify-center py-5">
                    <Image
                        className="w-[120px] h-[120px] bg-transparent rounded-full object-cover"
                        src={user?.avater?.url ? user?.avater?.url : profileImg}
                        alt="Profile Image"
                        width={112} // Width in pixels
                        height={112} // Height in pixels
                    />
                </div>
                <Link href="/profile" className={`${linkStyles} ${pathname === '/profile' ? activeLinkStyles : 'text-gray-800 dark:text-gray-300'} mt-3 md:mt-0`}>
                    <RiProfileLine size={20} />
                    <h2 className="text-lg hidden md:block font-medium">Profile</h2>
                </Link>
                <Link href="/profile/my-courses" className={`${linkStyles} ${pathname === '/profile/my-courses' ? activeLinkStyles : 'text-gray-800 dark:text-gray-300'}`}>
                    <SiCoursera size={20} />
                    <h2 className="text-lg hidden md:block font-medium">Courses</h2>
                </Link>
                {
                    user?.provider !== "google" && <Link href="/profile/forget-password" className={`${linkStyles} ${pathname === '/profile/forget-password' ? activeLinkStyles : 'text-gray-800 dark:text-gray-300'}`}>
                        <RiLockPasswordLine size={20} />
                        <h2 className="text-lg hidden md:block font-medium">Forget-Password</h2>
                    </Link>
                }
                {
                    user.role === "Admin" && <Link href="/admin" className={`${linkStyles} cursor-pointer text-gray-800 dark:text-gray-300`}>
                        <MdSpaceDashboard size={20} />
                        <h2 className="text-lg hidden md:block font-medium">Admin Dashboard</h2>
                    </Link>
                }
                <div onClick={logoutHandler} className={`${linkStyles} cursor-pointer text-gray-800 dark:text-gray-300`}>
                    <MdLogout size={20} />
                    <h2 className="text-lg hidden md:block font-medium">Logout</h2>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;
