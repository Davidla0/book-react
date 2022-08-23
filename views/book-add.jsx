import { BooksService } from '../services/books.service.js'
import { showErrorMsg, showSuccessMsg } from './../services/event-bus.service.js';

export class BookAdd extends React.Component {
    state = {

        value: null,
        books: null,

    }

    onSubmit = (event) => {
        event.preventDefault()
        BooksService.getApiBooks(this.state.value)
            .then(books => {
                this.setState({ books: books })

            })
    }

    handelChange = ({ target }) => {
        const { value } = target
        this.setState({ value }, () => { console.log(this.state.value) })
    }

    onAddGoogleBook = book => {
        BooksService.addGoogleBook(book)
        showSuccessMsg('Book Added')
    }

    render() {
        const { onSubmit, handelChange } = this
        const { value, books } = this.state
        return (
            <section>
                <form className="flex column" onSubmit={onSubmit}>
                    <label htmlFor="google-search">search for a book:</label>
                    <input type="text" placeholder="search for a book" name="google-search" id="google-search" onChange={handelChange} />
                    <button>search</button>
                </form>

                {books ?
                    books.map(book => <div className='flex space-between align-center'><p key={book.id}> {book.volumeInfo.title} - {book.volumeInfo.subtitle}
                        - By: {book.volumeInfo.authors.join('')}</p>
                        <button onClick={() => this.onAddGoogleBook(book)} style={{ borderRadius: 10 + 'px', backgroundColor: 'inherit' }}>+</button></div>) : ''
                }
            </section>
        )
    }

}

