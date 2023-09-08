'use client'
import { useEffect ,useState } from "react"
import { useRouter } from "next/navigation"

export default function Add() {
    const router = useRouter()
    const [form, setForm] = useState({
        name: '',
        address: '',
        number: 0,
        amount: 0,
        type : 'paunadar'
    })
    const [success, setSuccess] = useState('')

    const handlePost = async (e) => {
        e.preventDefault()
        let data = JSON.stringify(form)
        try {
            await fetch('/api/dar_post', {
                method: 'POST',
                body: data,
                mode: "cors",
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                  },
            })
            setSuccess(data)
            console.log(data)
            console.log(success)
        }
        catch (err) {
            console.log(err)
        } finally {
            setSuccess(data)
            console.log(form)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
          setSuccess(null)
        }, 4000);
        return () => clearTimeout(timer);
      }, [success]);

    return (
        <div className="postForm">
            <h1 style={{margin: 0}}>Paunadar</h1>
            {
                success && <div className="aleart success">
                    <p >{success} Added</p>
                    <button onClick={e=>{
                    }}>Close</button>
                </div>
            }
            <form>
                <div>
                    <label htmlFor="title">Name :</label>
                    <input type="text" onChange={e => {
                        setForm({ ...form, name: e.target.value })
                    }} />
                </div>
                <div>
                    <label htmlFor="title">Address :</label>
                    <input type="text" onChange={e => {
                        setForm({ ...form, address: e.target.value })
                    }} />
                </div>
                <div>
                    <label htmlFor="title">Number :</label>
                    <input type="number" onChange={e => {
                        setForm({ ...form, number: e.target.value })
                    }} />
                </div>
                <div>
                    <label htmlFor="title">Amount :</label>
                    <input type="number" onChange={e => {
                        setForm({ ...form, amount: e.target.value })
                    }} />
                </div>
                <div>
                    <label htmlFor="title">Type :</label>
                    <select name="type" id="" onChange={e => {
                        setForm({ ...form, type: e.target.value })
                    }}  >
                        <option value="paunadar">Paunadar</option>
                        <option value="denadar">Denadar</option>
                    </select>
                </div>
                <div>
                    <button type='submit' className="btnLogin" onClick={handlePost}>Post</button>
                </div>
            </form>
        </div>
    )
}
