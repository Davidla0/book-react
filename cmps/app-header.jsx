const { Link, NavLink, withRouter } = ReactRouterDOM
import { UserMsg } from './user-msg.jsx';

function _AppHeader() {
    return <header className="full main-layout">
        <div className="app-header flex space-between">
            <h1>bookery</h1>
            <nav>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/book" activeClassName="my-active">Our Books!</NavLink>
            </nav>
        </div>
        <UserMsg />

    </header>
}

export const AppHeader = withRouter(_AppHeader)