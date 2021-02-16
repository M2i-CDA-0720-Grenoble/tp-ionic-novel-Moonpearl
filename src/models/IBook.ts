import IChapter from "./IChapter";

export default interface IBook {
  id?: number;
  title: string;
  pageCount: number;
  createdAt: string;
  chapters?: IChapter[];
}
