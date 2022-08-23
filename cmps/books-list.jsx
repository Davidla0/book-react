import { BooksPreview } from "../cmps/books-preview.jsx"

export function BooksList({ books }) {
    return <section className="books-list">
        {books.map(book => <BooksPreview key={book.id} book={book} />)}
    </section>
}

