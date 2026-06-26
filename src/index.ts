type BookCategory = "Programming" | "Science" | "History" | "Novel";

interface ApiResponse<T>{
    success: boolean;
    message: string;
    data: T;
}

interface Result<T,E>{
    data: T;
    error: E;
}

interface Box<T>{
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
    {id: 1,title: "Clean Code",author: "Robert C. Martin",pages: 464,category: "Programming",available: true},
    {id: 2,title: "A Brief History of Time",author: "Stephen Hawking",pages: 212,category: "Science",available: false},
    {id: 3,title: "The Guns of August",author: "Barbara W. Tuchman",pages: 651,category: "History",available: true},
    {id: 4,title: "To Kill a Mockingbird",author: "Harper Lee",pages: 281,category: "Novel",available: true},
    {id: 5,title: "You Don't Know JS Yet",author: "Kyle Simpson",pages: 143,category: "Programming",available: true},
    {id: 6,title: "Cosmos",author: "Carl Sagan",pages: 365,category: "Science",available: false},
    {id: 7,title: "SPQR: A History of Ancient Rome",author: "Mary Beard",pages: 536,category: "History",available: true},
    {id: 8,title: "The Great Gatsby",author: "F. Scott Fitzgerald",pages: 180,category: "Novel",available: false}
]

const records: BorrowRecord[] = []

type FindBookFunction = (id: number) => Book | undefined
const findBookById: FindBookFunction = (id) =>{
    return books.find(b => b.id === id)
}


const addBook = (id: number,title: string, author: string, pages: number, category: BookCategory, available: boolean) =>{
    const newBook = { id, title, author, pages, category, available}
    books.push(newBook)
}


const removeBook = (id: number): void => {
    const BookById = books.findIndex(b => b.id === id)
    if(BookById === -1) return
    books.splice(BookById, 1)

}


const getBooksByCategory = (category: BookCategory) =>{
    return books.filter(b => b.category === category)
}

const getAvailableBooks = () =>{
    return books.filter(b => b.available === true)
}

const getUnavailableBooks = () => {
    return books.filter(b => b.available === false)
}


const countBooks = () => {
    return books.length
}



const borrowBook = (id: number,bookId: number, borrower: string, days: number) => {
    const findBookToBorrow = books.find(b => b.id === bookId)
    if(!findBookToBorrow) return
    if(findBookToBorrow.available == false)return "Book is not available"

    const borrowRecord: BorrowRecord = {id, bookId, borrower, days}
    records.push(borrowRecord)
    findBookToBorrow.available = false
    return "Book borrowed successfully";
}

const returnBook = (bookId: number) => {
    const findBookToReturn = books.find(b => b.id === bookId);
    if(!findBookToReturn) return "Book not found";
    findBookToReturn.available = true;
    return "Book returned successfully";
}


const response: ApiResponse<Book[]> = {
    success: true,
    message: "",
    data: books
}

const successRes: Result<Book, null> = {
    data: books[0]!,
    error: null
}

const ErrorRes: Result<null, string> = {
    data: null,
    error: "Error"
}

const book: Box<Book> = {
    value: books[0]!
}


const getFirst = <T>(arr: T[]) => {
    return arr[0]
}

const getLast = <T>(arr: T[]) => {
    return arr[arr.length - 1];
}

const duplicate = <T>(item: T) => {
    return [item, item]
}


const wrapInObject = <T>(value: T): { data: T } => {
    return { data: value };
};


const getId = <T extends { id: number }>(item: T) => {
    return item.id
}

const printTitle = <T extends {title: string;}>(book: T) => {
    return book.title
}


const printBook = <T extends Book>(book: T) => {
    console.log(`ID: ${book.id}`);
    console.log(`Title: ${book.title}`);
    console.log(`Author: ${book.author}`);
    console.log(`Category: ${book.category}`);
    console.log(`Pages: ${book.pages}`);
    console.log(`Available: ${book.available}`);
}




const searchBooks = (keyword: string) => {
    return books.filter(b=> b.title || b.author === keyword)

}


const getStatistics = (books: Book[], records: BorrowRecord[] ) => {
    let totalPages: number = 0
    books.forEach(book => totalPages += book.pages);
    return books.length
    const availableCount = books.filter(b => b.available === true).length;
    const borrowedCount = books.filter(b => b.available === false).length;
    return {
        totalBooks: books.length,
        availableBooks: availableCount,
        borrowedBooks: borrowedCount,
        totalPages: totalPages
    }


}


const recommendBooks = (category : BookCategory) => {
    const filtered = books.filter(b => b.category === category);
    return filtered.slice(0, 3);
}