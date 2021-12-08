import './App.css'
import { AuthProvider } from './utils/UserContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {
	CreatePost,
	Header,
	Login,
	Logout,
	PostList,
	Signup,
} from './components'

function App() {
	return (
		<AuthProvider>
			<Router>
				<Header />
				<Switch>
					<Route path="/" exact component={PostList} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/logout" component={Logout} />
					<Route path="/create-post" component={CreatePost} />
				</Switch>
			</Router>
		</AuthProvider>
	)
}

export default App
