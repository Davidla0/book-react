import {BooksApp} from './views/books-app.jsx'
import {Home} from './views/home-page.jsx'
import {AppHeader} from './cmps/app-header.jsx'
import {About} from './views/about.jsx'
import { BookDetails } from './views/book-details.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app main-layout">
        <AppHeader />
            <Switch>
                <Route path="/book/:bookId" component={BookDetails}/>
                <Route path="/book" component={BooksApp} /> 
                <Route path="/about" component={About} /> 
                <Route path="/" component={Home} /> 
            </Switch>
        
        </section>
    </Router>
}