import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Button } from "../ui/button";

type Props = {
    item: any;
    isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
    return (
        <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner flex flex-col flex-grow-0">
            <Image
                src={item.thumbnail.url}
                width={500}
                height={300}
                objectFit="contain"
                className="rounded w-full"
                alt=""
            />
            <br />
            <h1 className="font-Josefin text-xl font-medium text-black dark:text-[#fff]">
                {item.name}
            </h1>
            <Link href={`/courses/${item?._id}`}>
                <Button className="w-full flex-grow-0 mt-1.5">View Details</Button>
            </Link>
        </div>
    );
};

export default CourseCard;