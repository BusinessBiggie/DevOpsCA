export interface Post {
    id: number;
    title: string;
    content: string;
    department: Department;
    createdAt: string;
    updatedAt: string | null;
  }
  
  export enum Department {
    Technology = 0,
    Marketing = 1,
    Sales = 2,
    HR = 3,
    Finance = 4,
    Operations = 5,
    Legal = 6
  }