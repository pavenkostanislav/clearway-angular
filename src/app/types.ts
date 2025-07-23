export interface Annotation {
  id: string;
  text: string;
  position: { x: number; y: number };
  createdAt: Date;
  blob?: File | null;
}

export interface Page {
  number: number;
  imageUrl: string;
  annotations?: Annotation[]
}

export interface DocumentData {
  name: string;
  pages: Page[];
}