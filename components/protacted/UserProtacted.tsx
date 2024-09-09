"use client"
import { ReactNode, useEffect } from "react";
import { useLoadUserQuery } from "@/redux/feature/api/apiSlice";
import { useRouter } from "next/navigation";

const UserProtected = ({ children }: { children: ReactNode }) => {
    const { data, isLoading } = useLoadUserQuery(undefined);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !data) {
            router.push('/');
        }
    }, [isLoading, data, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return data?.data ? children : null;
};

export default UserProtected;
