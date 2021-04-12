import IChapter from "./IChapter";
import IReview from "./IReview";

export default interface IBook {
  id?: number;
  title: string;
  pageCount: number;
  createdAt: string;
  chapters?: IChapter[];
  reviews?: IReview[];
}
