'use client'
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login(){
    const [email , setMail ] = useState(null)
    const [pass, setPass] = useState(null)

    const router = useRouter()
    const {login} = useAuthContext()
    const handleLogin = async () =>{
        try{
        await login(email, pass)
        router.push('/')
        }
        catch (error){
            console.log(error)
        }
    }

    return <form>
        <div>
            <h1>Login to St_Db</h1>
        </div>
        <div>
            <label htmlFor="mail">Email</label>
            <input id="mail" type="email" onChange={(e)=>{
                setMail(e.target.value)
            }} />
        </div>
        <div>
            <label htmlFor="pass">Password</label>
            <input id="pass" type="email" onChange={e=>{
                setPass(e.target.value)
            }} />
        </div>
        <div>
            <button className="btnLogin" onClick={handleLogin}>Login</button>
        </div>
    </form>
}