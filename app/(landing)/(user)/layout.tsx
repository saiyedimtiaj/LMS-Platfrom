"use client"
import UserProtacted from '@/components/protacted/UserProtacted';
import ProfileSidebar from '@/components/user-profile/profileSidebar';
import { useParams } from 'next/navigation';
import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    const params = useParams()

    return (
        <UserProtacted>
            <div className='container mx-auto px-4 flex gap-5 my-14'>
                {
                    params?.id ? '' : <div className='sticky top-14 left-0'>
                        <ProfileSidebar />
                    </div>
                }
                <div className="w-full dark:text-gray-300">
                    {children}
                </div>
            </div >
        </UserProtacted>
    );
};

export default Layout;
