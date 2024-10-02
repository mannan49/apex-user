export interface BlogContent {
    title: string;
    description: string;
    link: string;
}

export interface Blog {
    _id: string;
    title: string;
    applyDate: string; 
    lastDate: string;  
    image: string;
    links: string[];
    opportunities: string;
    country: string;
    university: string;
    category: string;
    maxRange: number;
    content: BlogContent[];
    createdAt: string; 
    updatedAt: string;
}
