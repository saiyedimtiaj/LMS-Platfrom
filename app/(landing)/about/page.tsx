import Image from "next/image";
import banner from "../../../public/images/about.jpg"

const teamData = [
    {
        name: "John Doe",
        role: "Chief Executive Officer (CEO)",
        image: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258219/mvrd4h1gooa8mkufj5tv.avif"
    },
    {
        name: "Reech Chung",
        role: "Senior Developer",
        image: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258219/rrlmiegk4occ98wcbkdv.avif"
    },
    {
        name: "Emily Smith",
        role: "Product Manager",
        image: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258219/u2rb8wx3tvwdo8gnepyf.avif"
    },
    {
        name: "Sarah Johnson",
        role: "Marketing Head",
        image: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258218/my92jirblk6nq6oasp3x.avif"
    },
    {
        name: "Michael Brown",
        role: "Lead Designer",
        image: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258218/xcnudyobxebnoxbsxocy.avif"
    },
    {
        name: "Chris Evans",
        role: "Software Engineer",
        image: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258218/siopbuys6frspb9shepo.avif"
    },
    {
        name: "Sophia Martinez",
        role: "HR Manager",
        image: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258219/xfpovp0jjld8mlqliq9y.avif"
    },
    {
        name: "James Taylor",
        role: "Backend Developer",
        image: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258218/ts7iigwqslwzdlyfpjbt.avif"
    }
];

const Page = () => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="md:text-5xl text-2xl font-bold text-center font-Josefin my-10">Our Mission</h1>
            <div className="flex flex-col lg:flex-row gap-8 mb-14">
                <div className="lg:w-1/2 w-full">
                    <Image src={banner} alt="banner" width={500} height={500} className="w-full h-full rounded-md" />
                </div>
                <div className="lg:w-1/2 w-full font-Poppins space-y-7">
                    <p>
                        <span className="text-purple-500 font-Poppins">Why: </span> We are passionate about empowering individuals to transform their lives through the power of coding. We believe that everyone should have access to high-quality, affordable coding education, regardless of their background or experience.
                    </p>
                    <p>
                        <span className="text-purple-500 font-Poppins">What: </span>We provide a comprehensive range of online programming courses, from beginner-level Web Development to advanced CSE Fundamentals and Advanced Programming Courses. Our courses are designed to be engaging, effective, and tailored to the needs of today&apos;s learners.
                    </p>
                    <p>
                        <span className="text-purple-500 font-Poppins">How: </span>We nurture our students in a personalized and supportive environment that fosters confidence and success. Our friendly and dedicated instructors are always available to guide and mentor our students, ensuring they receive the support they need to achieve their coding goals.
                    </p>
                </div>
            </div>
            <div>
                <h1 className="md:text-5xl text-2xl font-bold text-center font-Josefin my-10">Our Teams</h1>
                <div className="mt-10 font-Poppins grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-14">
                    {teamData.map((member, index) => (
                        <div key={index} className="flex items-center dark:bg-slate-900 bg-slate-200 p-5 rounded-md flex-col">
                            <Image src={member.image} alt={member.name} width={200} height={400} className="w-full object-cover rounded-md h-full" />
                            <p className="font-medium text-lg mt-1">{member.name}</p>
                            <p className="text-gray-500 text-sm">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
