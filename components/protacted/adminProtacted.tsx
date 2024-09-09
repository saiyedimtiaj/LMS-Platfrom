"use client"
import { useLoadUserQuery } from '@/redux/feature/api/apiSlice';
import { useEffect, ReactNode } from 'react';
import Loader from '../Loader/Loader';
import { useRouter } from 'next/navigation';

const AdminProtected = ({ children }: { children: ReactNode }) => {
    const { data, isLoading } = useLoadUserQuery(undefined);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !data) {
            router.push('/');
        }
    }, [isLoading, data, router]);

    if (isLoading) {
        return <Loader />
    }

    return data?.data?.role === "Admin" ? children : null;
};

export default AdminProtected;
