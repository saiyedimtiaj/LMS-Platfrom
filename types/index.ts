export type TBenefits = {
  title: string;
  _id: string;
};
export type TPrerequisites = {
  _id: string;
  title: string;
};

export interface ICourse {
  _id: string;
  name: string;
  description: string;
  price: number;
  thumbnail: { public_id: string; url: string };
  tags: string;
  demoUrl: string;
  language: string;
  title: string;
  category: string;
  level: string;
  benefits: TBenefits[];
  prerequisites: TPrerequisites[];
  ratings?: number;
  purchased?: number;
}

export type TContent = {
  _id: string;
  videoNo: number;
  videoName: string;
  videoLength: number;
  videoUrl: string;
};

export type TModule = {
  _id: string;
  moduleNo: number;
  moduleName: string;
  courseId: string;
  content: TContent[];
};

export type TUserCourse = {
  courseId: string;
  _id: string;
  videoNo: number;
  moduleNo: number;
};

export interface IOrder {
  _id: string;
  courseId: ICourse;
  userId: string;
  paymentId: string;
  amount: number;
  createdAt: string;
}

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  avater: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: TUserCourse[];
};
