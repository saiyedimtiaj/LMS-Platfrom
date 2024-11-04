"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { Edit, UploadIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { useUpdateProfileMutation } from "@/redux/feature/auth/authApi";
import { toast } from "sonner";
import { useGetUserOdrersQuery } from "@/redux/feature/orders/ordersApi";
import { IOrder } from "@/types";
import banner from "../../public/images/cover.jpg";
import defaultProfile from "../../public/images/149071.png";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface UserInfo {
    name: string;
    email: string;
    address: string;
    phone: string;
    avater: string;
}

const Profile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const { user } = useAppSelector(state => state.auth);
    const { data, isLoading: ordersLoading } = useGetUserOdrersQuery(undefined);
    const [updateProfile, { isSuccess, error, isLoading }] = useUpdateProfileMutation();
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: user?.name || '',
        email: user?.email || "",
        address: user?.address || "",
        phone: user?.phone || "",
        avater: user?.avater || ""
    });

    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const isFormChanged = (
            userInfo.name !== user?.name ||
            userInfo.email !== user?.email ||
            userInfo.address !== user?.address ||
            userInfo.phone !== user?.phone ||
            image !== null
        );
        setIsChanged(isFormChanged);
    }, [userInfo, image, user]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Profile information changed!");
            setIsEdit(false);
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFileName(files[0].name);
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImage(result);
                setUserInfo({
                    ...userInfo,
                    avater: result,
                });
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isChanged) {
            await updateProfile(userInfo);
        }
    };

    if (ordersLoading) {
        return <p>Loading orders...</p>;
    }

    return (
        <div className="-mr-3 md:mr-0 font-Poppins bg-gray-100 dark:bg-[#141D2E] px-3 md:px-5 pt-5 pb-10 rounded-lg">
            <div className="flex justify-between mb-5 border-dashed border-b-2 pb-1 border-gray-600">
                <h1 className="text-purple-500 text-sm font-medium">My Profile</h1>
                <Edit onClick={() => setIsEdit(!isEdit)} className="cursor-pointer text-gray-800 dark:text-gray-300" />
            </div>
            <div>
                <Image src={banner} alt="banner" width={700} height={400} className="w-full h-[200px] md:h-[240px] object-cover" />
                <div className="relative w-[120px] h-[120px] ml-14 -mt-10">
                    <Image
                        src={image || user?.avater?.url || defaultProfile}
                        alt="Profile"
                        width={120}
                        height={120}
                        className="object-cover rounded-full"
                    />
                    {isEdit && (
                        <div
                            onClick={() => document.querySelector<HTMLInputElement>(".input-Field")?.click()}
                            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer"
                        >
                            <UploadIcon className="text-white w-6 h-6" />
                            <input
                                type="file"
                                hidden
                                name="files"
                                className="input-Field"
                                onChange={handleFileChange}
                            />
                        </div>
                    )}
                </div>
            </div>
            {
                !isEdit ? (
                    <>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-5 w-full mt-3">
                            <div className="md:w-1/2">
                                <h1 className="font-medium mt-5 text-sm text-gray-600 dark:text-gray-400">Name :</h1>
                                <p className="font-medium text-sm -mt-[1px]">{user?.name}</p>
                            </div>
                            <div>
                                <h1 className="font-medium mt-5 text-sm text-gray-600 dark:text-gray-400">Email :</h1>
                                <p className="font-medium text-sm -mt-[1px]">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-5 w-full mt-3">
                            <div className="md:w-1/2">
                                <h1 className="font-medium mt-5 text-sm text-gray-600 dark:text-gray-400">Address :</h1>
                                <p className="font-medium text-sm -mt-[1px]">{user?.address}</p>
                            </div>
                            <div>
                                <h1 className="font-medium mt-5 text-sm text-gray-600 dark:text-gray-400">Phone :</h1>
                                <p className="font-medium text-sm -mt-[1px]">{user?.phone}</p>
                            </div>
                        </div>
                        <h1 className="text-purple-500 mt-8 text-sm font-medium border-dashed border-b-2 pb-1 border-gray-600">Orders</h1>
                        <Table className="mt-4">
                            <TableHeader className="dark:bg-[#170F21] bg-gray-300">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead>Course</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            {data?.data?.length > 0 && data?.data?.map((order: IOrder, index: number) => (
                                <TableBody key={index} className={`${index === 0 ? 'border-0' : "border-gray-500"}`}>
                                    <TableRow className="hover:bg-transparent">
                                        <TableCell>{order?.courseId.name}</TableCell>
                                        <TableCell>$ {order?.amount}</TableCell>
                                        <TableCell>{order?.createdAt.slice(0, 10)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            ))}

                        </Table>
                    </>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-5 w-full mt-3">
                            <div className="md:w-1/2">
                                <Label className="text-sm">Name</Label>
                                <input
                                    name="name"
                                    value={userInfo.name}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    className="px-4 py-2 rounded w-full mt-2 bg-white dark:bg-[#2c1f3e] focus:outline-none"
                                />
                            </div>
                            <div className="md:w-1/2">
                                <Label className="text-sm">Email</Label>
                                <input
                                    name="email"
                                    value={userInfo.email}
                                    disabled
                                    placeholder="Email"
                                    className="px-4 py-2 rounded w-full mt-2 bg-white dark:bg-[#2c1f3e] focus:outline-none cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-5 w-full mt-3">
                            <div className="md:w-1/2">
                                <Label className="text-sm">Address</Label>
                                <input
                                    name="address"
                                    value={userInfo.address}
                                    onChange={handleChange}
                                    placeholder="Address"
                                    className="px-4 py-2 rounded w-full mt-2 bg-white dark:bg-[#2c1f3e] focus:outline-none"
                                />
                            </div>
                            <div className="md:w-1/2">
                                <Label className="text-sm">Phone</Label>
                                <input
                                    name="phone"
                                    value={userInfo.phone}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                    className="px-4 py-2 rounded w-full mt-2 bg-white dark:bg-[#2c1f3e] focus:outline-none"
                                />
                            </div>
                        </div>
                        <Button
                            disabled={!isChanged}
                            className="bg-purple-500 dark:bg-purple-500 text-white mt-8"
                        >
                            Save Changes
                        </Button>
                    </form>
                )
            }
            {
                data?.data?.length <= 0 && <div className="text-center w-full mt-5 tex-xl font-medium">
                    <h1> No Order Found!</h1>
                </div>
            }
        </div>
    );
};

export default Profile;
