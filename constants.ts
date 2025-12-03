import { Category, ItemStatus, Product, User } from './types';

export const CURRENT_USER: User = {
  id: 101,
  username: "隔壁老王_CS",
  avatar: "https://picsum.photos/seed/user101/100/100",
  studentId: "2023001",
  major: "网络空间安全",
  joinDate: "2023-09-01"
};

export const MOCK_USERS: Record<number, User> = {
  101: CURRENT_USER,
  102: {
    id: 102,
    username: "王艺_Art",
    avatar: "https://picsum.photos/seed/user102/100/100",
    studentId: "2022055",
    major: "视觉传达",
    joinDate: "2023-09-15"
  },
  103: {
    id: 103,
    username: "张强_Sport",
    avatar: "https://picsum.photos/seed/user103/100/100",
    studentId: "2020112",
    major: "体育教育",
    joinDate: "2022-03-10"
  }
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    sellerId: 102,
    title: "iPad Air 5 (64G) + Apple Pencil",
    description: "考研结束出。屏幕无划痕，带类纸膜。送保护壳。适合记笔记和画画。",
    price: 3200,
    originalPrice: 4500,
    category: Category.ELECTRONICS,
    images: ["https://picsum.photos/seed/ipad/400/300"],
    status: ItemStatus.AVAILABLE,
    publishDate: "2024-05-10",
    viewCount: 156,
    location: "图书馆门口"
  },
  {
    id: 2,
    sellerId: 103,
    title: "捷安特山地车 9成新",
    description: "大三学长毕业出车。刹车灵敏，变速顺滑。仅在校内骑行。",
    price: 600,
    originalPrice: 1200,
    category: Category.TRANSPORT,
    images: ["https://picsum.photos/seed/bike/400/300"],
    status: ItemStatus.AVAILABLE,
    publishDate: "2024-05-12",
    viewCount: 89,
    location: "北区宿舍楼下"
  },
  {
    id: 3,
    sellerId: 102,
    title: "高等数学(第七版) 上下册",
    description: "期末复习必备，书内有详细笔记，重点已划。",
    price: 25,
    originalPrice: 88,
    category: Category.BOOKS,
    images: ["https://picsum.photos/seed/books/400/300"],
    status: ItemStatus.SOLD,
    publishDate: "2024-05-01",
    viewCount: 45,
    location: "二食堂"
  }
];

export const MYSQL_SCHEMA = `
-- 用户表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    student_id VARCHAR(20) UNIQUE,
    major VARCHAR(100),
    join_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 商品表
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    category ENUM('BOOKS', 'ELECTRONICS', 'LIFESTYLE', 'TRANSPORT', 'CLOTHING', 'OTHER'),
    status ENUM('ON_SALE', 'SOLD_OUT', 'RESERVED') DEFAULT 'ON_SALE',
    publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    view_count INT DEFAULT 0,
    location VARCHAR(100),
    FOREIGN KEY (seller_id) REFERENCES users(id)
);
`;

export const FULL_INIT_SQL = `
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS unitrade_db CHARACTER SET utf8mb4;
USE unitrade_db;

-- 2. Table: Users
DROP TABLE IF EXISTS \`users\`;
CREATE TABLE \`users\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`username\` varchar(50) NOT NULL,
  \`student_id\` varchar(20) DEFAULT NULL,
  \`major\` varchar(100) DEFAULT NULL,
  \`avatar\` varchar(255) DEFAULT NULL,
  \`join_date\` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uk_student_id\` (\`student_id\`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4;

-- 3. Table: Products
DROP TABLE IF EXISTS \`products\`;
CREATE TABLE \`products\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`seller_id\` int NOT NULL,
  \`title\` varchar(100) NOT NULL,
  \`description\` text,
  \`price\` decimal(10,2) NOT NULL,
  \`original_price\` decimal(10,2) DEFAULT NULL,
  \`category\` enum('BOOKS','ELECTRONICS','LIFESTYLE','TRANSPORT','CLOTHING','OTHER') NOT NULL,
  \`status\` enum('ON_SALE','SOLD_OUT','RESERVED') DEFAULT 'ON_SALE',
  \`images\` text,
  \`location\` varchar(100) DEFAULT NULL,
  \`view_count\` int DEFAULT '0',
  \`publish_date\` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`fk_products_seller\` (\`seller_id\`),
  CONSTRAINT \`fk_products_seller\` FOREIGN KEY (\`seller_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- 4. Insert Mock Users
INSERT INTO \`users\` (\`id\`, \`username\`, \`student_id\`, \`major\`, \`avatar\`, \`join_date\`) VALUES 
(101, '隔壁老王_CS', '2023001', '网络空间安全', 'https://picsum.photos/seed/user101/100/100', '2023-09-01 10:00:00'),
(102, '王艺_Art', '2022055', '视觉传达', 'https://picsum.photos/seed/user102/100/100', '2023-09-15 14:30:00'),
(103, '张强_Sport', '2020112', '体育教育', 'https://picsum.photos/seed/user103/100/100', '2022-03-10 09:15:00');

-- 5. Insert Mock Products
INSERT INTO \`products\` (\`id\`, \`seller_id\`, \`title\`, \`description\`, \`price\`, \`original_price\`, \`category\`, \`status\`, \`images\`, \`location\`, \`view_count\`, \`publish_date\`) VALUES 
(1, 102, 'iPad Air 5 (64G) + Apple Pencil', '考研结束出。屏幕无划痕，带类纸膜。送保护壳。适合记笔记和画画。', 3200.00, 4500.00, 'ELECTRONICS', 'ON_SALE', '["https://picsum.photos/seed/ipad/400/300"]', '图书馆门口', 156, '2024-05-10 08:00:00'),
(2, 103, '捷安特山地车 9成新', '大三学长毕业出车。刹车灵敏，变速顺滑。仅在校内骑行。', 600.00, 1200.00, 'TRANSPORT', 'ON_SALE', '["https://picsum.photos/seed/bike/400/300"]', '北区宿舍楼下', 89, '2024-05-12 18:20:00'),
(3, 102, '高等数学(第七版) 上下册', '期末复习必备，书内有详细笔记，重点已划。', 25.00, 88.00, 'BOOKS', 'SOLD_OUT', '["https://picsum.photos/seed/books/400/300"]', '二食堂', 45, '2024-05-01 12:00:00');

SET FOREIGN_KEY_CHECKS = 1;
`;