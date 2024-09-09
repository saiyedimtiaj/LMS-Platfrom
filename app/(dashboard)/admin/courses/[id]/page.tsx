import AddNewModule from '@/components/course/AddNewModule';
import EditCourseInfo from '@/components/course/EditCourseInfo';
import React from 'react';

type Props = {
    params: {
        id: string
    }
}

const page = ({ params }: Props) => {
    return (
        <div>
            <div className='dark:bg-[#111C43] bg-gray-200 px-4 py-6 rounded-md mt-4 mb-14 flex flex-col lg:flex-row gap-5'>
                <div className='lg:w-1/2 w-full'>
                    <EditCourseInfo id={params.id} />
                </div>
                <div className='lg:w-1/2 w-full'>
                    <AddNewModule id={params?.id} />
                </div>
            </div>
        </div>
    );
};

export default page;