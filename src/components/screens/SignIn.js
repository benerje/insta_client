import React,{useState,useContext,} from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

const SignIn = () => {
    const {state,dispatch} = useContext(UserContext)
    const history  = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const PostData = ()=>{

    fetch("/signin",{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            password,
            email,
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
       if(data.error){
        M.toast({html:data.error,classes:"#c62828 red darken-2"})
       }
       else{
           localStorage.setItem("jwt",data.token)
           localStorage.setItem("user",JSON.stringify(data.user))
           dispatch({type:"USER",payload:data.user})
           M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
           history.push('/')
       }
    }).catch(err=>{
        console.log(err)
    })
    }

    
    return (
        <div className = "mycard">
           <div className="card auth-card input-field">
               <h2>Instagram</h2> 
               <input type="email"  placeholder="Email"  value={email}  onChange={(e)=>setEmail(e.target.value)}/>
               <input type="password" placeholder="Password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
               <button className="btn waves-effect waves-light #42a5f5 blue lighten-1 "
               onClick={()=>PostData()}
               >
                  Signin
               </button>
               <h5>
                   <Link to = "/signup">
                       Don't have an account ?
                   </Link>
               </h5>
           </div>
        </div>
    )
}

export default SignIn
