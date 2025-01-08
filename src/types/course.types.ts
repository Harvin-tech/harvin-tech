export interface getCourse_I {
  _id: string;
  title: string;
  subTitle?: string | null;
  image?: string | null;
  category: string;
  instructor: {
    [key: string]: any;
  }; // ObjectId reference to users
  type: string;
  price?: number;
  level?: string;
  mrp?: number;
  description: string;
  status?: 0 | 1 | -1;
}
