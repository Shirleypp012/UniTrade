export enum Category {
  BOOKS = '书籍教材',
  ELECTRONICS = '数码电子',
  LIFESTYLE = '生活用品',
  TRANSPORT = '代步工具',
  CLOTHING = '衣物鞋帽',
  OTHER = '其他'
}

export enum ItemStatus {
  AVAILABLE = 'ON_SALE',
  SOLD = 'SOLD_OUT',
  RESERVED = 'RESERVED'
}

export interface User {
  id: number;
  username: string;
  avatar: string;
  studentId: string;
  major: string;
  joinDate: string;
}

export interface Product {
  id: number;
  sellerId: number;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  category: Category;
  images: string[];
  status: ItemStatus;
  publishDate: string;
  viewCount: number;
  location: string; // e.g., "Library", "Dorm A"
}

export interface SqlLog {
  timestamp: string;
  action: string;
  query: string;
}