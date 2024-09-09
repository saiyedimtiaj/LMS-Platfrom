import { ArrowBigDown, Link2, Plus, Trash } from "lucide-react";
import React, { FC, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { FiUploadCloud } from "react-icons/fi";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { Progress } from "../ui/progress";
import { cloudVideoUpload } from "@/app/utils/cloudVideoUpload";
type ContentItem = {
    moduleNo?: number;
    moduleName: string;
    content: { videoName: string; videoUrl: string; videoLength: number, videoNo: number }[];
};

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: ContentItem[];
    setCourseContentData: (courseContentData: ContentItem[]) => void;
    handleSubmit: any;
};

const CourseContent: FC<Props> = ({
    courseContentData,
    setCourseContentData,
    active,
    setActive,
    handleSubmit: handlleCourseSubmit,
}) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean[]>(
        Array(courseContentData.length).fill(false)
    );
    const [videoDraging, setVideoDragging] = useState(false);
    const [progressBar, setProgressBar] = useState<null | number>(null);
    const [videoFileName, setVideoFileName] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleCollapseToggle = (index: number) => {
        const updatedCollapsed = [...isCollapsed];
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed);
    };

    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].content.splice(linkIndex, 1);
        setCourseContentData(updatedData);
    };

    const handleAddLink = (index: number) => {
        const lastContent = courseContentData[index].content[courseContentData[index].content.length - 1];
        if (lastContent.videoName === "" || lastContent.videoUrl === "") {
            toast.error("Please fill all the fields first!");
        } else {
            const updatedData = [...courseContentData];
            updatedData[index].content.push({ videoName: "", videoUrl: "", videoNo: updatedData[index].content.length + 1, videoLength: 0 });
            setCourseContentData(updatedData);
        }
    };

    const addNewSection = () => {
        const lastModule = courseContentData[courseContentData.length - 1];
        const lastContent = lastModule.content[0];
        if (lastModule.moduleName === "" || lastContent.videoName === "" || lastContent.videoUrl === "") {
            toast.error("Please fill all the fields first!");
        } else {
            const newContent: ContentItem = {
                moduleNo: courseContentData.length + 1,
                moduleName: "",
                content: [{ videoName: "", videoUrl: "", videoLength: 0, videoNo: 1 }],
            };
            setCourseContentData([...courseContentData, newContent]);
        }
    };

    const prevButton = () => {
        setActive(active - 1);
    };

    const handleOptions = () => {
        if (
            courseContentData[courseContentData.length - 1].moduleName === "" ||
            courseContentData[courseContentData.length - 1].content[0].videoName === "" ||
            courseContentData[courseContentData.length - 1].content[0].videoUrl === ""
        ) {
            return toast.error("section can't be empty!");
        } else {
            setActive(active + 1);
            handlleCourseSubmit();
        }
    };

    const handleVideo = async (e: React.FormEvent<HTMLInputElement>, index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        try {
            const data = await cloudVideoUpload(e, setProgressBar, setVideoFileName)
            if (data) {
                updatedData[index].content[linkIndex].videoUrl = data
                setCourseContentData(updatedData);
            }
        }
        catch (err) {
            toast.error("Failed to upload video!")
        }
    }

    const handleVideoDrop = async (e: any, index: number, linkIndex: number) => {
        e.preventDefault();
        const updatedData = [...courseContentData];
        try {
            const data = await cloudVideoUpload(e, setProgressBar, setVideoFileName)
            if (data) {
                updatedData[index].content[linkIndex].videoUrl = data
                setCourseContentData(updatedData);
            }
        }
        catch (err) {
            toast.error("Failed to upload video!")
        }
    };

    const handleVideoDragLeave = (e: any) => {
        e.preventDefault();
        setVideoDragging(false);
    };

    const handleVideoDragOver = (e: any) => {
        e.preventDefault();
        setVideoDragging(true);
    };


    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                {courseContentData.map((item: ContentItem, index: number) => {

                    item.moduleNo = index + 1
                    const showSectionInput = null

                    return (
                        <div
                            className={`w-full ${showSectionInput ? "mt-10" : "mb-0"
                                }`}
                            key={index}
                        >
                            <div className="text-xl font-medium">Module {index + 1}</div>

                            <div className="flex w-full items-center justify-between my-0">
                                {isCollapsed[index] ? (
                                    <>
                                        {item.moduleName && (
                                            <p className="font-Poppins dark:text-white text-black">
                                                {index + 1}. {item.moduleName}
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <div></div>
                                )}

                                <div className="flex items-center ">
                                    <Trash
                                        className={`dark:text-white text-[20px] mr-2 text-black ${index > 0 ? "cursor-pointer" : "cursor-no-drop"
                                            }`}
                                        onClick={() => {
                                            if (index > 0) {
                                                const updatedData = [...courseContentData];
                                                updatedData.splice(index, 1);
                                                setCourseContentData(updatedData);
                                            }
                                        }}
                                    />
                                    <ArrowBigDown
                                        fontSize="large"
                                        className="dark:text-white text-black"
                                        style={{
                                            transform: isCollapsed[index]
                                                ? "rotate(180deg)"
                                                : "rotate(0deg)",
                                        }}
                                        onClick={() => handleCollapseToggle(index)}
                                    />
                                </div>
                            </div>
                            {
                                !isCollapsed[index] && (
                                    <>
                                        <div className="my-3">
                                            <Label className="">Module Name</Label>
                                            <Input
                                                type="text"
                                                placeholder="Project Plan..."
                                                className={``}
                                                value={item.moduleName}
                                                onChange={(e) => {
                                                    const updatedData = [...courseContentData];
                                                    updatedData[index].moduleName = e.target.value;
                                                    setCourseContentData(updatedData);
                                                }}
                                            />
                                        </div>

                                        {item?.content?.map((link: any, linkIndex: number) => {
                                            // link.videoNo = linkIndex + 1
                                            return (
                                                <div className="mb-3 block" key={linkIndex}>
                                                    <div className="w-full flex items-center justify-between">
                                                        <h1 className="text-xl font-medium mt-5 mb-3">Content {linkIndex + 1}</h1>
                                                        <Trash
                                                            className={`${linkIndex === 0
                                                                ? "cursor-no-drop"
                                                                : "cursor-pointer"
                                                                } text-black dark:text-white text-[20px]`}
                                                            onClick={() =>
                                                                linkIndex === 0
                                                                    ? null
                                                                    : handleRemoveLink(index, linkIndex)
                                                            }
                                                        />
                                                    </div>
                                                    <Label>Video Name</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Video Name"
                                                        className="mb-2"
                                                        value={link.videoName}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].content[linkIndex].videoName =
                                                                e.target.value;
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                    <Label className="">Video Length</Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Video Time"
                                                        className={``}
                                                        value={link.videoLength}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContentData];
                                                            updatedData[index].content[linkIndex].videoLength = parseFloat(e.target.value)
                                                            setCourseContentData(updatedData);
                                                        }}
                                                    />
                                                    <div className="mt-2">
                                                        <Label>Video Url</Label>
                                                        <div>
                                                            <input
                                                                type="file"
                                                                accept="video/*"
                                                                id="video"
                                                                className="hidden "
                                                                onChange={(e) => handleVideo(e, index, linkIndex)}
                                                            />
                                                            <label
                                                                htmlFor="video"
                                                                className={`flex flex-col bg-white dark:bg-[#020817] w-full mt-1 ${link?.videoUrl ? 'h-full' : "border border-gray-500 h-[250px] border-dashed"} justify-center items-center gap-y-2 rounded-md ${videoDraging ? "bg-blue-500" : "bg-transparent"
                                                                    }`}
                                                                onDragOver={handleVideoDragOver}
                                                                onDragLeave={handleVideoDragLeave}
                                                                onDrop={(e) => handleVideoDrop(e, index, linkIndex)}
                                                            >
                                                                {
                                                                    link?.videoUrl ? <video className="w-full h-full" controls>
                                                                        <source src={link.videoUrl} type="video/mp4" />
                                                                    </video> : <div className="flex flex-col items-center justify-center gap-y-2">
                                                                        <FiUploadCloud size={50} />
                                                                        <p className="text-xs font-normal">
                                                                            Drag & drop your file here
                                                                        </p>
                                                                        <p className="text-xs font-normal">or</p>
                                                                        <p className="text-xs px-2.5 py-1 rounded bg-gray-400 dark:bg-[#111C43]">
                                                                            Browse Files
                                                                        </p>
                                                                    </div>
                                                                }

                                                            </label>
                                                            {
                                                                progressBar !== null && <div className="flex w-full items-center mt-3 gap-2">
                                                                    <h1><HiDocumentArrowUp size={25} /></h1>
                                                                    <div>
                                                                        <p className="text-sm font-normal text-gray-500">{videoFileName}</p>
                                                                        <Progress value={progressBar} className="w-full dark:bg-[#020817] h-[4px]" />
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <br />
                                        {/* add link button */}
                                        <div className="inline-block mb-4">
                                            <p
                                                className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                                                onClick={() => handleAddLink(index)}
                                            >
                                                <Link2 className="mr-2" /> Add Content
                                            </p>
                                        </div>
                                    </>
                                )
                            }
                            <br />

                        </div>
                    );
                })}
                <div
                    className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
                    onClick={() => addNewSection()}
                >
                    <Plus className="mr-2" /> Add new Module
                </div>
            </form >
            <div className="w-full flex items-center justify-between">
                <div
                    className="px-8 py-2.5  bg-[#3B82F6] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => prevButton()}
                >
                    Prev
                </div>
                <div
                    className="px-8 py-2.5 bg-[#3B82F6] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => handleOptions()}
                >
                    Next
                </div>
            </div>
        </div >
    );
};

export default CourseContent;
