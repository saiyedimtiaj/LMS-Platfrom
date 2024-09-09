"use client"

import UserCourseLoading from "@/components/Loader/UserCourseLoading";
import { Progress } from "@/components/ui/progress";
import { useLoadUserQuery } from "@/redux/feature/api/apiSlice";
import { useGetModuleQuery, useGetUserAccessCourseQuery } from "@/redux/feature/courses/coursesApi";
import { ICourse, TModule, TUserCourse } from "@/types";
import Image from "next/image";
import Link from "next/link";

const MyCourses = () => {
    const { data, isLoading, isFetching } = useGetUserAccessCourseQuery(undefined);
    const { data: user } = useLoadUserQuery(undefined)
    const { data: module, isLoading: isModuleLoading } = useGetModuleQuery(undefined)
    if (isLoading || isModuleLoading || isFetching) {
        return <UserCourseLoading />
    };


    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    data?.data?.map((item: ICourse) => {
                        const filterCourse = user?.data?.courses.find((course: TUserCourse) => course.courseId === item?._id)

                        console.log();

                        const filterModule = module?.data?.filter((module: TModule) => module?.courseId === filterCourse?.courseId)
                        const totalVideos = filterModule?.reduce((acc: number, mod: TModule) => acc + mod.content.length, 0);

                        const completedVideos = filterModule?.slice(0, filterCourse?.moduleNo - 1).reduce((acc: number, mod: TModule) => acc + mod.content.length, 0) + filterCourse?.videoNo - 1;

                        const progress = (completedVideos / totalVideos) * 100 || 0

                        return <div key={item?._id} className="w-full  dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner flex flex-col">
                            <Image
                                src={item.thumbnail.url}
                                width={500}
                                height={300}
                                objectFit="contain"
                                className="rounded w-full"
                                alt=""
                            />
                            <br />
                            <div className="flex items-center gap-3 mb-2">
                                <Progress value={progress} className="w-full h-[10px]" />
                                <p className="font-medium">{progress.toFixed(0)}%</p>
                            </div>
                            <h1 className="font-Josefin text-xl font-medium text-black dark:text-[#fff]">
                                {item.name}
                            </h1>
                            <Link href={`/profile/my-courses/${item?._id}`} className="mt-3">
                                <button className="w-full py-2.5 text-white font-medium rounded-md bg-blue-600 mt-1.5">Continue Course</button>
                            </Link>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default MyCourses;