import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
    {
        id: "item-1",
        question: "Will AI eliminate web developer jobs in the future?",
        answer: "AI won't replace web developers; it will increase the demand. New needs will arise, such as building websites for AI-based applications and adding AI features to existing websites, alongside millions of other necessary sites. While AI will automate some aspects of web development, skilled developers will become even more valuable."
    },
    {
        id: "item-2",
        question: "Will non-CSE or non-science background students get jobs or internships in web development?",
        answer: "Yes, non-CSE and non-science background students can get jobs or internships in web development. Many employers prioritize skills and practical experience over specific academic backgrounds."
    },
    {
        id: "item-3",
        question: "How can you guarantee a job/internship?",
        answer: "Every student who remained engaged with our job placement team secured a job or internship. Even those who initially struggled eventually found success through persistence. This made us think: if you can guarantee 6-8 hours daily after finishing the course and SCIC, we guarantee you a job or internship within 3-6 months of completion."
    },
    {
        id: "item-4",
        question: "Can I finish this course along with my varsity study and exams?",
        answer: "If you're aiming for a GPA of 3.8 or above, it will be harder. Otherwise, you can manage your time and exams. Being late for 2-3 assignments won't disqualify you from SCIC. Our student care team can help you manage your time during exams and academic loads. To succeed, create a schedule, prioritize tasks, use time blocks, limit distractions, set goals, practice self-care, stay organized, and seek help when needed."
    },
    {
        id: "item-5",
        question: "For whom is this course?",
        answer: "This course is created for those who want to learn web development from scratch and build a career as a web developer in software companies. Even those who studied CSE for four years but didn’t learn much and couldn’t decide what to do, can complete web development from this course and apply for jobs. 😀"
    },
    {
        id: "item-6",
        question: "What prior experience is needed for this course?",
        answer: "Since we’ll be teaching from scratch, you don’t need to know anything beforehand. But if you have free time, you can do these things: Be comfortable with a computer, internet so that you can search anything online You should have Basic English literacy Typing speed 15-30 wpm will be excellent. Familiarity with HTML, CSS would be fantastic."
    },
    {
        id: "item-7",
        question: "What educational background is required?",
        answer: "We have designed the course in such a way that your educational background doesn’t matter here. You can do this course from any educational background. Anyone, such as a university student, college student, jobber, unemployed, lover, runaway lover, even the girlfriend who doesn’t pick up the phone can do this course. However, you have to commit 6-8 hours everyday."
    },
];

const Faq = () => {
    return (
        <div className='container mx-auto px-4'>
            <h1 className="text-center font-Poppins leading-[35px] md:text-3xl lg:text-5xl text-2xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight mb-14">
                Frequently Asked
                <br />Questions
            </h1>
            <div className='max-w-[900px] mx-auto mb-16 font-Poppins border-[#3C1F3B] py-5 px-8 rounded-lg border'>
                <Accordion type="single" collapsible className="w-full">
                    {faqData.map((item) => (
                        <AccordionItem key={item.id} value={item.id} className="border-0">
                            <AccordionTrigger className="flex text-start justify-between flex-row-reverse text-base md:text-lg lg:text-xl font-semibold">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-[12px] md:text-[14px] text-start">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default Faq;
