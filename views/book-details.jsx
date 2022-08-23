import { utilService } from "../services/util.service.js";
import { BooksService } from "../services/books.service.js"
import { LongTxt } from "../cmps/long-txt.jsx"
import { ReviewAdd } from '../cmps/review-add.jsx'
const { Link } = ReactRouterDOM

export class BookDetails extends React.Component {

    state = {
        book: null,
        isLongTxtShown: null,

    }

    componentDidMount() {
        console.log('this.props', this.props);

        this.onLoad()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.onLoad()
        }
    }

    onLoad = () => {
        const { bookId } = this.props.match.params
        BooksService.getBookById(bookId)
            .then(book => {
                if (!book) return this.goBack()
                this.setState({ book: book })
            })
    }

    onGoBack = () => {
        this.props.history.push('/book')
    }

    checkText(book) {
        const pageCount = book.pageCount
        if (pageCount > 500) return 'Long Reading'
        if (pageCount > 200) return 'Decent Reading'
        if (pageCount < 100) return 'Light Reading'
        return ''
    }

    checkPublishedDate(book) {
        const publishedDate = book.publishedDate
        const currYear = new Date().getFullYear()
        if (currYear - publishedDate > 10) return 'Veteran Book'
        if (currYear - publishedDate < 1) return 'New!'
        return ''
    }

    checkPrice(book) {
        const price = book.listPrice.amount
        if (price > 150) return 'red'
        if (price < 20) return 'green'
        return ''
    }

    setIsExpanded = (isLongTxtShown) => {
        this.setState({ isLongTxtShown: isLongTxtShown })
    }

    goBack = () => {
        console.log(this.props.history.push('/book'))
    }


    render() {
        const { book } = this.state

        if (!book) return <h1>loading..</h1>
        const nextBookId = BooksService.getNextBookId(book.id)
        return (<section className="book-details">
            {/* <div className="details"> */}
            <article className="details">
                <div className="exit"><button onClick={() => this.goBack()}>X</button></div>
                <div className="header">
                    <h1>{book.title}</h1>
                    <h3>{book.subtitle}</h3>
                    <h4>By: {book.authors[0]}</h4>
                    <div>
                        <img src={book.thumbnail} alt="" />
                        {book.listPrice.isOnSale && <img className="sale-img" src='assets/img/sale1.png' alt="" />}
                    </div>
                </div>
                <div className="description">
                    <h6>published At:{book.publishedDate} - {this.checkPublishedDate(book)}</h6>
                    <p><LongTxt text={book.description} isLongTxtShown={this.state.isLongTxtShown} descriptionLength={100} setIsExpanded={this.setIsExpanded} /></p>
                    <p>Pages: {book.pageCount} - {this.checkText(book)}</p>
                    <p>categories: {book.categories.map(category => <span key={category}>{category}</span>)}</p>
                    <p>language: {book.language}</p>
                    <p className={this.checkPrice(book)}>{book.listPrice.amount}{utilService.getPriceSymbol(book.listPrice.currencyCode)}</p>
                </div>

            </article>
            <Link to={`/book/${nextBookId}`}><button >Next book</button></Link>

            <div className="review full">
                <ReviewAdd id={book.id} book={book} onSubmit={this.onLoad} />
            </div>

        </section>
        )
    }
}

