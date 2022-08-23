import { DataBooks } from './data.js'
import { storageService } from '../services/storage.service.js'
export const BooksService = {
    query,
    getBookById,
    addReview,

}

const gBooks = DataBooks.getBooks()
const STORAGE_KEY = 'missBookDB'

function query(filterBy) {
    // console.log(gBooks);
    // let books = gBooks
    let books = _loadFromStorage(STORAGE_KEY)
    if (!books) books = gBooks
    console.log(filterBy)
    if (filterBy) {
        let { name, price } = filterBy
        console.log('filterBy from service', filterBy);
        if (!price) price = 0;
        console.log('filterBy from service', books);
        books = books.filter(book => (
            book.title.includes(name) &&
            book.listPrice.amount <= price
        ))
    }
    storageService.saveToStorage(STORAGE_KEY, books)
    console.log(books)
    return Promise.resolve(books)
}

function getBookById(bookId) {
    if (!bookId) return Promise.resolve(null)
    const books = _loadFromStorage(STORAGE_KEY)
    const selectedBook = books.find(book => book.id === bookId)
    console.log(selectedBook);
    return Promise.resolve(selectedBook)
}

function addReview(id, review) {
    const books = _loadFromStorage(STORAGE_KEY)
    console.log(books);
    const selectedBook = books.find(book => book.id === id)
    if (!selectedBook['review']) selectedBook['review'] = []
    selectedBook['review'].unshift(review)
    _saveToStorage(books)
    return Promise.resolve()
}

function _loadFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY)
}

function _saveToStorage(books) {
    storageService.saveToStorage(STORAGE_KEY, books)
}


