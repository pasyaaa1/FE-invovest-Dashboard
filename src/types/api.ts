/** Sesuai Prisma di `be_invofest/backend-web2` */

export interface EventItem {
  id: number;
  name: string;
  categoryId: string;
  location: string;
  dateEvent: string;
  description: string;
  createdAt: string;
}

export interface CategoryItem {
  id: number;
  name: string;
  createdAt: string;
}

export interface SpeakerItem {
  id: number;
  name: string;
  role: string;
  image: string;
  createdAt: string;
}
