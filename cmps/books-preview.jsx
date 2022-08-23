import { utilService } from "../services/util.service.js";
const {Link} = ReactRouterDOM

export function BooksPreview({book}){ 
    

    return <Link to={`/book/${book.id}`}>
    <article className="books-preview">
    <h3>{book.title}</h3>
    <h3>{book.listPrice.amount}{ utilService.getPriceSymbol(book.listPrice.currencyCode)}</h3>
    <div className="img-container">
        <img src={`${book.thumbnail}`} />
    </div>
    </article>
    </Link>
        
}