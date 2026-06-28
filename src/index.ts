type BookCategory = "Programming" | "Science" | "History" | "Novel";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface Result<T, E> {
  data: T;
  error: E;
}

interface Box<T> {
  value: T;
}

interface Book {
  id: number;
  title: string;
  author: string;
  pages: number;
  category: BookCategory;
  available: boolean;
}

interface BorrowRecord {
  id: number;
  bookId: number;
  borrower: string;
  days: number;
}

const books: Book[] = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    pages: 464,
    category: "Programming",
    available: true,
  },
  {
    id: 2,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    pages: 212,
    category: "Science",
    available: false,
  },
  {
    id: 3,
    title: "The Guns of August",
    author: "Barbara W. Tuchman",
    pages: 651,
    category: "History",
    available: true,
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    category: "Novel",
    available: true,
  },
  {
    id: 5,
    title: "You Don't Know JS Yet",
    author: "Kyle Simpson",
    pages: 143,
    category: "Programming",
    available: true,
  },
  {
    id: 6,
    title: "Cosmos",
    author: "Carl Sagan",
    pages: 365,
    category: "Science",
    available: false,
  },
  {
    id: 7,
    title: "SPQR: A History of Ancient Rome",
    author: "Mary Beard",
    pages: 536,
    category: "History",
    available: true,
  },
  {
    id: 8,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
    category: "Novel",
    available: false,
  },
];

const records: BorrowRecord[] = [];

type FindBookFunction = (id: number) => Book | undefined;
export const findBookById: FindBookFunction = (id) => {
  return books.find((b) => b.id === id);
};

export const addBook = (book: Book) => {
  books.push(book);
};

export const removeBook = (id: number): void => {
  const bookIndex = books.findIndex((b) => b.id === id);
  if (bookIndex === -1) return;
  books.splice(bookIndex, 1);
};

export const getBooksByCategory = (category: BookCategory) => {
  return books.filter((b) => b.category === category);
};

export const getAvailableBooks = () => {
  return books.filter((b) => b.available === true);
};

export const getUnavailableBooks = () => {
  return books.filter((b) => b.available === false);
};

export const countBooks = () => {
  return books.length;
};

export const borrowBook = (
  bookId: number,
  borrower: string,
  days: number,
): Result<BorrowRecord, string> => {
  const book = books.find((b) => b.id === bookId);
  if (!book) return { data: null as any, error: "Book not found" };
  if (!book.available)
    return { data: null as any, error: "Book is not available" };

  const newId = records.length + 1;
  const record: BorrowRecord = { id: newId, bookId, borrower, days };
  records.push(record);
  book.available = false;
  return { data: record, error: null as any };
};

export const returnBook = (bookId: number) => {
  const findBookToReturn = books.find((b) => b.id === bookId);
  if (!findBookToReturn) return "Book not found";
  findBookToReturn.available = true;
  return "Book returned successfully";
};

export const response: ApiResponse<Book[]> = {
  success: true,
  message: "",
  data: books,
};

export const successRes: Result<Book, null> = {
  data: books[0]!,
  error: null,
};

export const ErrorRes: Result<null, string> = {
  data: null,
  error: "Error",
};

export const book: Box<Book> = {
  value: books[0]!,
};

export const getFirst = <T>(arr: T[]) => {
  return arr[0];
};

export const getLast = <T>(arr: T[]) => {
  return arr[arr.length - 1];
};

export const duplicate = <T>(item: T) => {
  return [item, item];
};

export const wrapInObject = <T>(value: T): { data: T } => {
  return { data: value };
};

export const getId = <T extends { id: number }>(item: T) => {
  return item.id;
};

export const printTitle = <T extends { title: string }>(book: T) => {
  return book.title;
};

export const printBook = <T extends Book>(book: T) => {
  console.log(`ID: ${book.id}`);
  console.log(`Title: ${book.title}`);
  console.log(`Author: ${book.author}`);
  console.log(`Category: ${book.category}`);
  console.log(`Pages: ${book.pages}`);
  console.log(`Available: ${book.available}`);
};

export const searchBooks = (keyword: string) => {
  const k = keyword.toLocaleLowerCase();
  return books.filter(
    (b) =>
      b.title.toLocaleLowerCase().includes(k) ||
      b.author.toLocaleLowerCase().includes(k),
  );
};

export const getStatistics = (books: Book[], records: BorrowRecord[]) => {
  let totalPages = 0;
  books.forEach((book) => (totalPages += book.pages));
  const availableCount = books.filter((b) => b.available === true).length;
  const borrowedCount = books.filter((b) => b.available === false).length;
  const totalDaysBorrowed = records.reduce((sum, r) => sum + r.days, 0);
  return {
    totalBooks: books.length,
    availableBooks: availableCount,
    borrowedBooks: borrowedCount,
    totalPages,
    totalDaysBorrowed,
  };
};

export const recommendBooks = (category: BookCategory) => {
  const filtered = books.filter((b) => b.category === category);
  return filtered.slice(0, 3);
};
