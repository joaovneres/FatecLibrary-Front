import Publishing from './Publishing';

interface Book {
  idBook: string;
  titleBook: string;
  priceBook: string;
  publicationYearBook: string;
  editionBook: string;
  imageURL: string;
  publishing?: Publishing | null;
}

export default Book;
