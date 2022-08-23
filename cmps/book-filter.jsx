

export class BookFilter extends React.Component{
    state = {
        filterBy:{
            name: '',
            price: ''
        }
    }

    handleChange = ({ target }) => {
        const field = target.id
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }


    render(){
        const { name, price } = this.state.filterBy

        return(
                <section className="book-filter">
                    <label htmlFor="name">Search By Name</label>
                    <input
                        id="name" 
                        type="text"
                        placeholder="By Name.."
                        value={name}
                        onChange={this.handleChange}/>

                    <label htmlFor="price">By Price</label>
                    <input 
                    id="price" 
                    type="range" 
                    min={0}
                    max={200}
                    placeholder="By Price.."
                    value={price}
                    onChange={this.handleChange}/>

                    {/* <button type="submit">search</button> */}
            </section>
        )
    }
}