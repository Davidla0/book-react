import {BooksService} from '../services/books.service.js'

export class ReviewAdd extends React.Component{
    state={
        review:{
            name: null,
            rate: null,
            readAt: null,
            text:null
        }
    }
    
    handelChange = ({target}) => {
        
        const name = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({
            review:{
                ...prevState.review,
                [name]: value
            }
        }),() => console.log(this.state.review))
        
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        BooksService.addReview(this.props.id, this.state.review)
            .then(this.props.onSubmit(() => {
                this.setState({
                    review: {
                        fullName: '',
                        rate: 1,
                        readAt: null,
                        txt: ''
                    }
                }, this.props.onLoad())
            }))
    }


    render(){
        const {name, rate, text} = this.state.review
        {console.log(BooksService.getBookById(this.props.id))}
        return( <section className="review-add">
            <form onSubmit={this.onSubmit}>
                <label htmlFor="name">Full name:</label>
                <input type="text" id="name" name="name" value={name} onChange={this.handelChange}/>
                <label htmlFor="rate">Rate:</label>
                <input type="number" id="rate" name="rate" value={rate} onChange={this.handelChange}/>
                <label htmlFor="ReadAt">Read at:</label>
                <input type="date" id="ReadAt" name="readAt" min="<?=date('Y-m-d');?>" max="<?=date('Y-m-d',strtotime('now +1 week'));?>" 
                 onChange={this.handelChange}/>
                <label htmlFor="free-text">Free text:</label>
                <input type="text" id="free-text" name="text" value={text} onChange={this.handelChange}/>

                <button>Sent!</button>
            </form>
            <div>{this.props.book.review &&  this.props.book.review.map(rev => <div key={rev.name}><p>{rev.name}</p> <p>{rev.rate}</p> <p>{rev.readAt}</p> <p>{rev.text}</p></div>)}</div>
            </section>
        )
    }
}
