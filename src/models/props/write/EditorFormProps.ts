import type { RcFile } from "antd/lib/upload";

export interface EditorFormProps {
  title: string;
  body: string;
  featuredImage: RcFile | File | null;
  excerpt: string;
  topicsOfInterest: string[];
}
