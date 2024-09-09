import CourseDetails from '@/components/course/CourseDetails';
import React from 'react';

type Props = {
    params: {
        id: string
    }
}

const page = ({ params }: Props) => {
    return (
        <div>
            <CourseDetails id={params.id} />
        </div>
    );
};

export default page;