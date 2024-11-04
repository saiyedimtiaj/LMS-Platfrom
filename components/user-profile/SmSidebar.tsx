"use client"
import React, { useEffect } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { MdLogout, MdSpaceDashboard } from 'react-icons/md'
import Image from 'next/image'
import { useAppSelector } from '@/redux/hooks'
import profileImg from "../../public/images/149071.png"
import Link from 'next/link'
import { RiLockPasswordLine, RiProfileLine } from 'react-icons/ri'
import { SiCoursera } from 'react-icons/si'
import { usePathname, useRouter } from 'next/navigation'
import { useLogOutMutation } from '@/redux/feature/auth/authApi'
import { toast } from 'sonner'

const SmSidebar = () => {
    const pathname = usePathname();
    const { user } = useAppSelector(state => state.auth);
    const [logOut, { isSuccess, data }] = useLogOutMutation();
    const router = useRouter()

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
        <div className='mt-5 -mb-10 bg-[#141D2E] p-4 rounded block md:hidden'>
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
                    <div className="pb-5">
                        <div className="flex justify-center py-5">
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
                            <h2 className="text-lg font-medium">Profile</h2>
                        </Link>
                        <Link href="/profile/my-courses" className={`${linkStyles} ${pathname === '/profile/my-courses' ? activeLinkStyles : 'text-gray-800 dark:text-gray-300'}`}>
                            <SiCoursera size={20} />
                            <h2 className="text-lg font-medium">Courses</h2>
                        </Link>
                        {
                            user?.provider !== "google" && <Link href="/profile/forget-password" className={`${linkStyles} ${pathname === '/profile/forget-password' ? activeLinkStyles : 'text-gray-800 dark:text-gray-300'}`}>
                                <RiLockPasswordLine size={20} />
                                <h2 className="text-lg font-medium">Forget-Password</h2>
                            </Link>
                        }
                        {
                            user.role === "Admin" && <Link href="/admin" className={`${linkStyles} cursor-pointer text-gray-800 dark:text-gray-300`}>
                                <MdSpaceDashboard size={20} />
                                <h2 className="text-lg font-medium">Admin Dashboard</h2>
                            </Link>
                        }
                        <div onClick={logoutHandler} className={`${linkStyles} cursor-pointer text-gray-800 dark:text-gray-300`}>
                            <MdLogout size={20} />
                            <h2 className="text-lg font-medium">Logout</h2>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default SmSidebar
