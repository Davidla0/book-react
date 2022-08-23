import { BooksService } from "../services/books.service.js"
import { BooksList } from "../cmps/books-list.jsx"
import { BookDetails } from "./book-details.jsx"
import { BookFilter } from "../cmps/book-filter.jsx"


export class BooksApp extends React.Component {
    state = {
        books: [],
        // selectedBook: null,
        filterBy: null
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        BooksService.query(this.state.filterBy)
            .then((books) => this.setState({ books }))
    }

    onSetFilter = (filterBy) => {
        // console.log(filterBy)
        this.setState({ filterBy }, () => {
            this.loadBooks()
        })
    }

    onSelectBook = (bookId) => {
        // console.log('working')
        BooksService.getBook(bookId)
            .then(book => this.setState({ selectedBook: book[0] }))
    }

    // onUnSelectBook = () => {
    //     this.setState({selectedBook: null})
    // }


    render() {
        const { books } = this.state
        return (
            <section className="books-app">
                <React.Fragment>
                    {<BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />}
                    {<BooksList books={books} />}
                </React.Fragment>

                {/* {selectedBook && <BookDetails book={selectedBook} onUnSelectBook={this.onUnSelectBook} />} */}


            </section>
        )
    }
}