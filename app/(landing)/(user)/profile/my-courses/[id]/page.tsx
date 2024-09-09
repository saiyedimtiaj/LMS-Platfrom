'use client'
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLoadUserQuery } from "@/redux/feature/api/apiSlice";
import { useGetAllModuleQuery, useGetModuleContentQuery } from "@/redux/feature/courses/coursesApi";
import { TContent, TModule, TUserCourse } from "@/types";
import { FaArrowLeftLong, FaLock, FaCircleCheck } from "react-icons/fa6";
import { RxVideo } from "react-icons/rx";
import { useUserCourseContentUpdateMutation } from "@/redux/feature/user/userApi";
import Link from "next/link";

type TParams = {
    id: string
}

const Page = ({ params }: { params: TParams }) => {
    const [activeContent, setActiveContent] = useState<{ moduleNo: number, videoNo: number } | undefined>(undefined);
    const { data: user } = useLoadUserQuery(undefined);
    const filterCourse = user?.data?.courses?.find((course: TUserCourse) => course?.courseId === params.id);
    const [updateContent] = useUserCourseContentUpdateMutation()

    useEffect(() => {
        if (filterCourse && !activeContent) {
            setActiveContent({ moduleNo: filterCourse.moduleNo, videoNo: filterCourse.videoNo });
        }
    }, [filterCourse, activeContent]);

    const { data, isLoading } = useGetAllModuleQuery(params.id);
    const { data: contentInformation, isLoading: isContentLoading, isFetching } = useGetModuleContentQuery({ params, activeContent })



    const sortedModules = data?.data?.slice().sort((a: TModule, b: TModule) => a.moduleNo - b.moduleNo);

    const handleContentChange = (moduleNo: number, videoNo: number) => {
        if (moduleNo >= filterCourse?.moduleNo && videoNo > filterCourse?.videoNo) {
            return
        }
        setActiveContent({ moduleNo, videoNo });
    };

    const handleNext = () => {
        if (!activeContent) return;

        const currentModuleIndex = sortedModules.findIndex((module: TModule) => module.moduleNo === activeContent.moduleNo);
        const currentModule = sortedModules[currentModuleIndex];
        const currentVideoIndex = currentModule.content.findIndex((video: TContent) => video.videoNo === activeContent.videoNo);

        if (currentVideoIndex < currentModule.content.length - 1) {
            const nextVideoNo = activeContent.videoNo + 1;
            if (activeContent.moduleNo === filterCourse?.moduleNo && nextVideoNo > filterCourse?.videoNo) {
                updateContent({ id: params?.id, moduleNo: activeContent.moduleNo, videoNo: nextVideoNo })
                setActiveContent({ moduleNo: activeContent.moduleNo, videoNo: nextVideoNo });
                return;
            }
            handleContentChange(activeContent.moduleNo, nextVideoNo);
        } else if (currentModuleIndex < sortedModules.length - 1) {
            const nextModuleNo = activeContent.moduleNo + 1;
            if (nextModuleNo > filterCourse?.moduleNo) {
                updateContent({ id: params?.id, moduleNo: nextModuleNo, videoNo: 1 })
                setActiveContent({ moduleNo: nextModuleNo, videoNo: 1 });
                return;
            }
            handleContentChange(nextModuleNo, 1);
        }
    };

    const handlePrevious = () => {
        if (!activeContent) return;

        const currentModuleIndex = sortedModules.findIndex((module: TModule) => module.moduleNo === activeContent.moduleNo);
        const currentModule = sortedModules[currentModuleIndex];
        const currentVideoIndex = currentModule.content.findIndex((video: TContent) => video.videoNo === activeContent.videoNo);

        if (currentVideoIndex > 0) {
            // Move to previous video in the current module
            handleContentChange(activeContent.moduleNo, activeContent.videoNo - 1);
        } else if (currentModuleIndex > 0) {
            // Move to last video in the previous module
            const previousModule = sortedModules[currentModuleIndex - 1];
            handleContentChange(activeContent.moduleNo - 1, previousModule.content.length);
        }
    };

    return (
        <div className="container mx-auto px-4 mb-10">
            <div className="border-b-2 border-[#302442] pb-4 mb-6 flex items-center gap-2">
                <Link href={`/profile/my-courses`}>
                    <button className="bg-blue-600 text-white p-1.5 rounded-full"><FaArrowLeftLong size={12} /></button>
                </Link>
                {
                    isFetching ? <div className="animate-pulse w-full">
                        <div className="rounded-md bg-slate-200 dark:bg-slate-100 h-2 w-full"></div>
                    </div> : <h1 className="text-lg md:text-2xl font-semibold font-Poppins">
                        {contentInformation?.data?.moduleNo}-{contentInformation?.data?.videoNo} {contentInformation?.data?.videoName}
                    </h1>
                }
            </div>
            <div className="flex flex-col lg:flex-row gap-7">
                <div className="lg:w-4/6 w-full">
                    {
                        isFetching ? <div className="animate-pulse w-full h-full">
                            <div className="rounded-md bg-slate-200 dark:bg-slate-100 h-[300px] md:h-[380px] lg:h-[450px] w-full"></div>
                        </div> :
                            <video className="w-full h-full" controls>
                                <source src={contentInformation?.data?.videoUrl} type="video/mp4" />
                            </video>
                    }
                    <div className="flex justify-end gap-4 font-Josefin font-medium mt-3">
                        <button onClick={handlePrevious} className="px-6 rounded-md py-1.5 border-[#985cf0] border-2">Previous</button>
                        <button onClick={handleNext} className="px-7 rounded-md py-1.5 bg-[#C6ABFF] text-black">Next</button>
                    </div>
                </div>
                <div className="lg:w-2/6 w-full">
                    <h1 className="text-lg font-medium font-Poppins">Running Module : {contentInformation?.data?.moduleNo}</h1>
                    <div className="mt-2 font-Poppins">
                        <Accordion type="single" collapsible className="space-y-3 h-[400px] overflow-y-scroll">
                            {sortedModules?.map((course: TModule, index: number) => {
                                const moduleLength = course.content.reduce((total, video) => total + video.videoLength, 0);
                                return (
                                    <AccordionItem value={`item-${index}`} className="border-0 bg-[#F3F4F6] dark:bg-[#211336] px-3 rounded-lg" key={index}>
                                        <AccordionTrigger className="flex gap-10 justify-between flex-row-reverse">
                                            <div>
                                                <h4 className="text-start">Module {course?.moduleNo}: {course?.moduleName}</h4>
                                                <p className="text-gray-500 text-start text-sm font-light">{moduleLength} min</p>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {course?.content?.map((content) => (
                                                <div
                                                    onClick={() => handleContentChange(course?.moduleNo, content.videoNo)}
                                                    key={content?._id}
                                                    className={`flex gap-2 border-t cursor-pointer border-gray-500 my-2.5 py-3 px-4 ${activeContent?.moduleNo === course?.moduleNo && activeContent?.videoNo === content?.videoNo ? "bg-[#9E2AE6]" : ""}`}
                                                >
                                                    <div className="mt-[2px]">
                                                        {course?.moduleNo <= filterCourse?.moduleNo && content?.videoNo <= filterCourse?.videoNo ? (
                                                            <FaCircleCheck />
                                                        ) : (
                                                            <FaLock />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4>{course?.moduleNo}-{content?.videoNo} {content.videoName}</h4>
                                                        <div className={`flex items-center text-gray-500 gap-2 mt-1 ${activeContent?.moduleNo === course?.moduleNo && activeContent?.videoNo === content?.videoNo ? "text-white" : ""}`}>
                                                            <span><RxVideo /></span>
                                                            <h5>{content.videoLength} min</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
