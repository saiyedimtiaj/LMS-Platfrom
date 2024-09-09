import Courses from '@/components/home/Courses';
import Faq from '@/components/home/Faq';
import Hero from '@/components/home/Hero';
import ReviewCard from '@/components/home/Review';
import React from 'react';

const sampleItems = [
    {
        "quote": "The best way to predict the future is to invent it. Alan Kay, a pioneer in computer science, emphasized the power of innovation. He believed that by taking initiative and crafting new technologies and solutions, we can shape a future that aligns with our visions and aspirations.",
        "name": "Alan Kay",
        "title": "Computer Scientist",
        "role": "Web Developer",
        "image": "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1713767960/ndw4sznft3v5yemp3qmd.png"
    },
    {
        "quote": "Life is 10% what happens to us and 90% how we react to it. Charles R. Swindoll's words remind us that our reactions to events shape our experiences. By maintaining a positive attitude and resilient mindset, we can navigate challenges and make the most of life's opportunities.",
        "name": "Charles Swindoll",
        "title": "Author",
        "role": "App Developer",
        "image": "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258219/mvrd4h1gooa8mkufj5tv.avif"
    },
    {
        "quote": "Your time is limited, so don't waste it living someone else's life. Steve Jobs urged people to follow their passions and be true to themselves. He believed in the importance of pursuing one's own dreams and not being swayed by the opinions or expectations of others.",
        "name": "Steve Jobs",
        "title": "Co-founder of Apple",
        "role": "Software Engenear",
        "image": "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258218/my92jirblk6nq6oasp3x.avif"
    },
    {
        "quote": "The only way to do great work is to love what you do. Steve Jobs emphasized that passion is the key to excellence. When you love your work, you are more likely to invest the time and effort needed to achieve greatness and find fulfillment in your professional life.",
        "name": "Steve Jobsd",
        "title": "Co-founder of Apple",
        "role": "Data Analysis",
        "image": "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724258219/xfpovp0jjld8mlqliq9y.avif"
    },
    {
        "quote": "Success is not the key to happiness. Happiness is the key to success. Albert Schweitzer's words highlight the importance of finding joy and contentment in life. When you are happy and fulfilled, you are more likely to achieve success in your endeavors and maintain a positive outlook.",
        "name": "Albert Schweitzer",
        "title": "Philosopher",
        "role": "Web Developer",
        "image": "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1724391040/man-with-his-arms-crossed-shirt-that-says-hes-smiling_1022944-22208_yvhvsl.avif"
    }
]


const page = () => {
    return (
        <div>
            <Hero />
            <Courses />
            <ReviewCard items={sampleItems} />
            <Faq />
        </div>
    );
};

export default page;