import React,{useEffect,createContext,useReducer,useContext} from 'react'
import Navbar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route, Switch, useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import UserProfile from './components/screens/UserProfile'
import Signup from './components/screens/SignUp'
import SignIn from './components/screens/SignIn'
import CreatePost from './components/screens/CreatePost'
import Reset from './components/screens/Reset'
import SubscribedUser from './components/screens/SubscribedUser'
import {reducer,initialState} from './reducers/userReducer'


export const UserContext = createContext()

const Routing = ()=>{
  const {state,dispatch} = useContext(UserContext)

  const history = useHistory()
  useEffect(()=>{
     const user = JSON.parse(localStorage.getItem("user"))
     

     if(user){
       dispatch({type:"USER",payload:user})  //storing user in payload

     }else{
       if(!history.location.pathname.startsWith('/reset'))
          history.push('/signin')
     }
  },[])
  return(

    <Switch>

        <Route exact path="/">
            <Home />  
          </Route>

          <Route path="/signin">
              <SignIn />
          </Route>

          <Route exact path="/profile">
              <Profile />
          </Route>

          <Route path="/signup">
              <Signup />
          </Route>

          <Route path="/create">
              <CreatePost />
          </Route>

          <Route path="/profile/:userid">
              <UserProfile />
          </Route>

          <Route path="/myfollowingpost">
              <SubscribedUser />
          </Route>

          <Route path="/reset">
              <Reset />
          </Route>

    </Switch>
  )
}


function App() {

  const [state,dispatch] = useReducer(reducer,initialState)
  
  return (

      <UserContext.Provider value={{state,dispatch}} >
          
          <BrowserRouter>
            <Navbar />
            <Routing />    
          </BrowserRouter>

      </UserContext.Provider>
     

  )
}

export default App
