"use client"
import UserProtacted from '@/components/protacted/UserProtacted';
import ProfileSidebar from '@/components/user-profile/profileSidebar';
import SmSidebar from '@/components/user-profile/SmSidebar';
import { useParams } from 'next/navigation';
import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    const params = useParams()

    return (
        <UserProtacted>
            <div className='container mx-auto'>
                <div className='-mx-4'>
                    <SmSidebar />
                </div>
                <div className='flex gap-5 my-14 -ml-10 md:ml-0'>
                    {
                        params?.id ? '' : <div className='sticky top-14 left-0'>
                            <ProfileSidebar />
                        </div>
                    }
                    <div className="w-full dark:text-gray-300">
                        {children}
                    </div>
                </div >
            </div>
        </UserProtacted>
    );
};

export default Layout;
