import './App.css'
import { UserContext } from './utils/UserContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {
	CreatePost,
	Header,
	Login,
	Logout,
	PostList,
	Signup,
} from './components'
import { useEffect, useMemo, useState } from 'react'
import { refreshRequest } from './utils/refreshRequest'

const refreshResponse = refreshRequest()
function App() {
	const [user, setUser] = useState(() => null)

	useEffect(() => {
		refreshResponse.then(u => setUser(u as any))
	}, [])

	const providerValue = useMemo(() => ({ user, setUser }), [user])

	return (
		<UserContext.Provider value={providerValue}>
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
		</UserContext.Provider>
	)
}

export default App
