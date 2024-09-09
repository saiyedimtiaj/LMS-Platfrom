"use client";

import { useGetUserAllCoursesQuery } from "@/redux/feature/courses/coursesApi";
import { useState, useEffect } from "react";
import CoursesLoading from "../Loader/CoursesLoading";
import CourseCard from "../home/CourseCard";

const allCategory = [
    { title: "All", value: "" },
    { title: "Web Development", value: "Web Development" },
    { title: "App Development", value: "App Development" },
    { title: "Machine Learning", value: "Machine Learning" },
];

const AllCourses = () => {
    const { data, isLoading } = useGetUserAllCoursesQuery({});
    const [category, setCategory] = useState<string>("");
    const [filteredCourses, setFilteredCourses] = useState<any[]>([]);

    // Update courses when data or category changes
    useEffect(() => {
        if (data?.data) {
            // If no category is selected, show all courses
            if (category === "") {
                setFilteredCourses(data.data);
            } else {
                // Filter courses by the selected category
                const filtered = data.data.filter((course: any) =>
                    course.category === category
                );
                setFilteredCourses(filtered);
            }
        }
    }, [data, category]);

    const handleCategory = (value: string) => {
        setCategory(value);
    };

    return (
        <div>
            <div className="flex items-center justify-center flex-wrap gap-4 mt-8 mb-14">
                {allCategory.map((c) => (
                    <button
                        onClick={() => handleCategory(c.value)}
                        className={`font-medium font-Poppins px-4 text-xs md:text-base py-2 rounded-full ${category === c.value
                            ? "bg-purple-600"
                            : "dark:bg-white dark:text-black text-white bg-black"
                            }`}
                        key={c.title}
                    >
                        {c.title}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <CoursesLoading />
            ) : filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                    {filteredCourses.map((item: any, index: number) => (
                        <CourseCard item={item} key={index} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-lg mb-14 font-Poppins text-gray-600 dark:text-gray-300">
                    No courses found in this category.
                </div>
            )}
        </div>
    );
};

export default AllCourses;
