"use client";
import { LuListChecks } from "react-icons/lu";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useAddNewModuleMutation, useDeleteModuleMutation, useGetCourseModuleQuery } from "@/redux/feature/module/moduleApi";
import { TModule } from "@/types";
import { BiGridVertical } from "react-icons/bi";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import ConfirmModal from "../dialog/ConfirmModal";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { Progress } from "../ui/progress";
import { FiUploadCloud } from "react-icons/fi";
import { Label } from "../ui/label";
import { cloudVideoUpload } from "@/app/utils/cloudVideoUpload";

type Props = {
    id: string;
};

const AddNewModule = ({ id }: Props) => {
    const { data, isLoading } = useGetCourseModuleQuery(id);
    const [moduleId, setModuleId] = useState('')
    const [addNewModule, { isSuccess, error, isLoading: isAdding }] = useAddNewModuleMutation();
    const [deleteModule, { isSuccess: deleteSucess, error: deleteError }] = useDeleteModuleMutation()
    const [isAdd, setIsAdd] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [videoDraging, setVideoDragging] = useState(false);
    const [progressBar, setProgressBar] = useState<null | number>(null);
    const [videoFileName, setVideoFileName] = useState('')
    const [moduleContentData, setModuleContentData] = useState({
        moduleName: "",
        content: [
            {
                videoName: "",
                videoUrl: "",
                videoLength: 0,
                videoNo: 1,
            },
        ],
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const isModuleNameFilled = moduleContentData.moduleName.trim() !== "";
        const isContentFilled = moduleContentData.content.every(
            (video) =>
                video.videoName.trim() !== "" &&
                video.videoUrl.trim() !== "" &&
                video.videoLength > 0
        );
        setIsButtonDisabled(!isModuleNameFilled || !isContentFilled);
    }, [moduleContentData]);
    const [loadingToastId, setLoadingToastId] = useState<string | null>(null);

    useEffect(() => {
        if (isAdding) {
            const id = toast.loading("Adding module...");
            setLoadingToastId(id as any);
        }
    }, [isAdding]);

    useEffect(() => {
        if (isSuccess) {
            if (loadingToastId) {
                toast.dismiss(loadingToastId);
            }
            toast.success("Module added successfully!");
            setIsAdd(false)
            setModuleContentData({
                moduleName: "",
                content: [
                    {
                        videoName: "",
                        videoUrl: "",
                        videoLength: 0,
                        videoNo: 1,
                    },
                ],
            });
        } else if (error) {
            if (loadingToastId) {
                toast.dismiss(loadingToastId);
            }
            if ("data" in error!) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error, loadingToastId]);

    useEffect(() => {
        if (deleteSucess) {
            toast.success("delete module sucessfull!")
        }
        if (deleteError) {
            if ("data" in deleteError!) {
                const errorData = deleteError as any;
                toast.error(errorData.data.message)
            }
        }
    }, [deleteSucess, deleteError])

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const handleAddVideo = (index: number) => {
        const lastVideo = moduleContentData.content[moduleContentData.content.length - 1];
        if (lastVideo.videoName === "" || lastVideo.videoUrl === "") {
            return toast.error("Please fill all the fields first!");
        }
        setModuleContentData((prev) => ({
            ...prev,
            content: [
                ...prev.content,
                {
                    videoName: "",
                    videoLength: 0,
                    videoUrl: "",
                    videoNo: prev.content.length + 1,
                },
            ],
        }));
    };



    const handleInputChange = (index: number, field: string, value: string | number) => {
        const updatedContent = [...moduleContentData.content];
        updatedContent[index] = {
            ...updatedContent[index],
            [field]: value,
        };
        setModuleContentData({
            ...moduleContentData,
            content: updatedContent,
        });
    };

    const handleModuleNameChange = (value: string) => {
        setModuleContentData({
            ...moduleContentData,
            moduleName: value,
        });
    };

    const handleAddModule = async () => {
        const newModuleData = { ...moduleContentData, courseId: id, moduleNo: data?.data?.length + 1 }
        await addNewModule(newModuleData);
    };

    const handleModal = (id: string) => {
        setIsOpen(true)
        setModuleId(id)
    }

    const handleDelete = async () => {
        deleteModule(moduleId)
    }

    const handleVideo = async (e: React.FormEvent<HTMLInputElement>, index: number) => {
        const updatedContent = [...moduleContentData.content];
        try {
            const data = await cloudVideoUpload(e, setProgressBar, setVideoFileName)
            if (data) {
                updatedContent[index] = {
                    ...updatedContent[index],
                    videoUrl: data,
                };
                setModuleContentData({
                    ...moduleContentData,
                    content: updatedContent,
                })
            }
        }
        catch (err) {
            toast.error("Failed to upload video!")
        }
    }

    const handleVideoDrop = async (e: any, index: number) => {
        e.preventDefault();
        const updatedContent = [...moduleContentData.content];
        try {
            const data = await cloudVideoUpload(e, setProgressBar, setVideoFileName)
            if (data) {
                updatedContent[index] = {
                    ...updatedContent[index],
                    videoUrl: data,
                };
                setModuleContentData({
                    ...moduleContentData,
                    content: updatedContent,
                })
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
        <div>
            <div className="flex items-center gap-2">
                <span><LuListChecks size={22} /></span>
                <p>Customize Modules</p>
            </div>
            <div className="flex items-center justify-between text-sm mt-5">
                <p>Course Module</p>
                <button className="flex items-center gap-1" onClick={() => setIsAdd(true)}>
                    <span><MdOutlineAddCircleOutline /></span>
                    <span>Add a module</span>
                </button>
            </div>
            <div className="mt-2 space-y-3">
                {data?.data?.map((module: TModule) => (
                    <div
                        key={module?._id}
                        className="flex justify-between items-center dark:bg-[#020817] bg-white px-3 py-2 rounded"
                    >
                        <div className="flex items-center gap-1">
                            <span><BiGridVertical /></span>
                            <span className="text-sm font-normal">{module?.moduleName}</span>
                        </div>
                        <div>
                            <button onClick={() => handleModal(module?._id)} ><Trash size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
            {isAdd && (
                <div className="mt-4">
                    <div>
                        <label className="text-sm font-medium">Module Name</label>
                        <input
                            name="moduleName"
                            value={moduleContentData.moduleName}
                            onChange={(e) => handleModuleNameChange(e.target.value)}
                            className="px-4 py-2 rounded w-full text-sm bg-white dark:bg-[#020817] focus:outline-none"
                        />
                    </div>
                    {moduleContentData?.content?.map((video, index) => (
                        <div key={index}>
                            <h1 className="text-[17px] mt-3">Content {index + 1}</h1>
                            <div>
                                <label className="text-sm font-medium">Video Name</label>
                                <input
                                    value={video?.videoName}
                                    onChange={(e) => handleInputChange(index, "videoName", e.target.value)}
                                    name="videoName"
                                    className="px-4 py-2 rounded w-full text-sm bg-white dark:bg-[#020817] focus:outline-none"
                                />
                            </div>
                            <div className="mt-1">
                                <label className="text-sm font-medium">Video Length</label>
                                <input
                                    value={video?.videoLength}
                                    onChange={(e) => handleInputChange(index, "videoLength", parseInt(e.target.value))}
                                    name="videoLength"
                                    type="number"
                                    className="px-4 py-2 rounded w-full text-sm bg-white dark:bg-[#020817] focus:outline-none"
                                />
                            </div>
                            <div className="mt-2">
                                <Label>Video Url</Label>
                                <div>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        id="video"
                                        className="hidden "
                                        onChange={(e) => handleVideo(e, index)}
                                    />
                                    <label
                                        htmlFor="video"
                                        className={`flex flex-col bg-white dark:bg-[#020817] w-full mt-1 ${video?.videoUrl ? 'h-full' : "border border-gray-500 h-[250px] border-dashed"} justify-center items-center gap-y-2 rounded-md ${videoDraging ? "bg-blue-500" : "bg-transparent"
                                            }`}
                                        onDragOver={handleVideoDragOver}
                                        onDragLeave={handleVideoDragLeave}
                                        onDrop={(e) => handleVideoDrop(e, index)}
                                    >
                                        {
                                            video?.videoUrl ? <video className="w-full h-full" controls>
                                                <source src={video.videoUrl} type="video/mp4" />
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
                            <div className="flex mt-2 justify-end">
                                <button onClick={() => handleAddVideo(index)} className="flex items-center gap-1">
                                    <MdOutlineAddCircleOutline />
                                    <span>Add a Video</span>
                                </button>
                            </div>
                        </div>
                    ))}
                    <Button onClick={handleAddModule} className="mt-3" disabled={isButtonDisabled}>
                        Add Module
                    </Button>
                </div>
            )}
            <ConfirmModal handleConfirm={handleDelete} open={isOpen} setOpen={setIsOpen} />
        </div>
    );
};

export default AddNewModule;
