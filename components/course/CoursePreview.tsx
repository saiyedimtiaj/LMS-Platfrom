import React from 'react';
import { BsBarChartFill } from "react-icons/bs";
import { IoCheckmark, IoLanguageOutline } from "react-icons/io5"
import { MdOutlineAccessTime, MdOutlineOndemandVideo } from "react-icons/md";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Dot } from 'lucide-react';

type ContentItem = {
    moduleNo?: number;
    moduleName: string;
    content: { videoName: string; videoUrl: string; videoLength: number, videoNo: number }[];
};

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseInfo: any;
    handleCourseCreate: any;
    benefits: { title: string }[];
    prerequisites: { title: string }[];
    module: ContentItem[]
};

const CoursePreview = ({
    courseInfo,
    handleCourseCreate,
    setActive,
    active,
    benefits,
    prerequisites, module
}: Props) => {
    const prevButton = () => {
        setActive(active - 1);
    };

    const createCourse = () => {
        handleCourseCreate();
    };

    const totalContentCount = module?.reduce((total, module) => total + module.content.length, 0);

    const totalVideoLengthInMinutes = module?.reduce((total, module) =>
        total + module.content.reduce((subTotal, content) => subTotal + content.videoLength, 0),
        0);

    // Convert minutes to hours and minutes
    const hours = Math.floor(totalVideoLengthInMinutes / 60);
    const minutes = totalVideoLengthInMinutes % 60;

    return (
        <div className="py-5 mb-5">

            <div className="flex flex-col lg:flex-row">

                <div className="space-y-3 w-full lg:w-1/2">
                    <h1 className="font-semibold uppercase text-purple-600">#{courseInfo.category}</h1>
                    <h1 className="text-4xl font-bold ">{courseInfo.name}</h1>
                    <h1 className="font-medium text-[18px]">{courseInfo.title}</h1>
                    <div className="mt-2 flex flex-col gap-y-2 max-w-[350px]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <span><MdOutlineAccessTime size={20} /></span>
                                <span>Course Duration</span>
                            </div>
                            <p>30-40 Hours</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <span><BsBarChartFill size={20} /></span>
                                <span>Course Level</span>
                            </div>
                            <p>{courseInfo.level}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <span><IoLanguageOutline size={20} /></span>
                                <span>Course Language</span>
                            </div>
                            <p>{courseInfo.language}</p>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold"><span>Price:</span> <span className="text-lg">${courseInfo.price}</span></h3>
                </div>
                <div className="h-full mt-10 lg:mt-0 w-full lg:w-1/2">
                    <iframe src={courseInfo.demoUrl} className="w-full h-[250px]" allowFullScreen={true}></iframe>
                </div>
            </div>
            <div className="max-w-[650px] px-4 pb-4 pt-9 border mt-5 border-gray-500">
                <h3 className="text-2xl font-semibold">What youll learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                    {
                        benefits?.map((item: any, index: number) => <div className="flex gap-1" key={index}>
                            <p><IoCheckmark /></p>
                            <p className="font-Poppins text-sm font-light">{item?.title}</p>
                        </div>)
                    }
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-2xl font-semibold">Course content</h3>
                <p className="text-gray-500 mt-5">{module?.length} module {totalContentCount} lectures {`${hours}h ${minutes}m total length`}</p>
                <Accordion type="single" collapsible className="max-w-[650px] mt-1">
                    {
                        module?.map((module, index: number) => {
                            const videoLength = module.content.reduce((total: number, content) => (total + content.videoLength), 0)
                            return (
                                <AccordionItem key={index} value={`item-${index}`} className="border-t border-r border-gray-500 border-l px-4">
                                    <AccordionTrigger>
                                        <div className="flex justify-between w-full">
                                            <h3>{module.moduleName}</h3>
                                            <h5>
                                                <div className="flex items-center gap-3">
                                                    <span> {module.content.length} lectures</span>
                                                    <span>{videoLength} min</span>
                                                </div>
                                            </h5>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-3">
                                        {
                                            module?.content?.map((content, index) => <div key={index} className="flex items-center justify-between">
                                                <div className="flex gap-3 items-center">
                                                    <span><MdOutlineOndemandVideo /> </span>
                                                    <span>{content.videoName}</span>
                                                </div>
                                                <p>{content.videoLength}min</p>
                                            </div>
                                            )
                                        }
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })
                    }
                </Accordion>
            </div>
            <div className="max-w-[650px] mt-10">
                <h3 className="text-2xl font-semibold mb-5">Requirements</h3>
                {
                    prerequisites?.map((item, index) => <div className="flex items-center gap-3" key={index}>
                        <span><Dot /></span>
                        <span className="font-light font-Poppins text-sm">{item?.title}</span>
                    </div>)
                }
            </div>


            <div className="w-full flex items-center mt-10 justify-between">
                <div
                    className="px-8 py-2.5  bg-[#3B82F6] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => prevButton()}
                >
                    Prev
                </div>
                <div
                    className="px-8 py-2.5  bg-[#3B82F6] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => createCourse()}
                >
                    Create
                </div>
            </div>
        </div>
    );
};

export default CoursePreview;