import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';

export const navItemsData = [
    { name: "Home", url: "/" },
    { name: "Course", url: "/courses" },
    { name: "About", url: "/about" },
]

type Props = {
    isMobile: boolean
    setOpenSidebar: Dispatch<SetStateAction<boolean>>
}

const NavItems = ({ isMobile, setOpenSidebar }: Props) => {
    return (
        <>
            <div className='hidden md:flex'>
                {
                    navItemsData && navItemsData.map((item, index) => (
                        <Link href={item.url} key={index} passHref>
                            <span className={`'dark:text-white text-black'} text-[18px] px-3 font-Poppins`}>{item.name}</span>
                        </Link>
                    ))
                }
            </div>
            {
                isMobile && (
                    <div className='md:hidden mt-3 pb-3'>
                        {
                            navItemsData && navItemsData.map((item, index) => (
                                <Link href={item.url} key={index} passHref onClick={() => setOpenSidebar(false)}>
                                    <span className={`${index === 0 && "border-none"} block py-1 text-[18px] dark:text-white font-Poppins text-lg text-black border-t mx-6 border-[#3A3250] `}>{item.name}</span>
                                </Link>
                            ))
                        }
                    </div>
                )
            }
        </>
    );
};

export default NavItems;