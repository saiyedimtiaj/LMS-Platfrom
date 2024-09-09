import LgSidebar from '@/components/admin/sidebar/LgSidebar';
import SmSidebar from '@/components/admin/sidebar/SmSidebar';
import AdminProtected from '@/components/protacted/adminProtacted';
import React, { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {

    return (
        <AdminProtected>
            <div className="min-h-screen font-Poppins w-full flex">
                <LgSidebar />
                <div className="flex flex-col w-full">
                    <SmSidebar />
                    <div className='px-4 py-4 '>
                        {children}
                    </div>
                </div>
            </div>
        </AdminProtected>
    );
};

export default layout;
