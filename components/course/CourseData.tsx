import React, { FC } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "sonner";
import { style } from "../styled/style";
import { Input } from "../ui/input";

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
    benefits,
    setBenefits,
    prerequisites,
    setPrerequisites,
    active,
    setActive,
}) => {

    const handleBenefitChange = (index: number, value: any) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    };

    const handleAddBenefit = () => {
        setBenefits([...benefits, { title: "" }]);
    };

    const handlePrerequisitesChange = (index: number, value: any) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setPrerequisites(updatedPrerequisites);
    };

    const handleAddPrerequisites = () => {
        setPrerequisites([...prerequisites, { title: "" }]);
    };

    const prevButton = () => {
        setActive(active - 1);
    }

    const handleOptions = () => {
        if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
            setActive(active + 1);
        } else {
            toast.error("Please fill the fields for go to next!")
        }
    };


    return (
        <div className="">
            <div>
                <label className={`${style.label} text-[20px]`} htmlFor="email">
                    What are the benefits for students in this course?
                </label>
                <br />
                {benefits?.map((benefit: any, index: number) => (
                    <Input
                        type="text"
                        key={index}
                        name="Benefit"
                        placeholder="You will be able to build a full stack LMS Platform..."
                        required
                        className={`my-2`}
                        value={benefit.title}
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                    />
                ))}
                <AiOutlinePlusCircle
                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                    onClick={handleAddBenefit}
                />
            </div>

            <div>
                <label className={`${style.label} text-[20px]`} htmlFor="email">
                    What are the prerequisites for starting this course?
                </label>
                <br />
                {prerequisites?.map((prerequisites: any, index: number) => (
                    <Input
                        type="text"
                        key={index}
                        name="prerequisites"
                        placeholder="You need basic knowledge of MERN stack"
                        required
                        className={`my-2`}
                        value={prerequisites.title}
                        onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
                    />
                ))}
                <AiOutlinePlusCircle
                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}

                    onClick={handleAddPrerequisites}
                />
            </div>
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
        </div>
    );
};

export default CourseData;