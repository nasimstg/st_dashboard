import { useState } from "react"
import Router, { useRouter } from "next/router"
export default function Add() {
    const router = useRouter()
    const [form, setForm] = useState({
        title: '',
        description: ''
    })
    const [success, setSuccess] = useState(false)
    const handlePost = async (e) => {
        e.preventDefault()
        console.log(e)
        console.log(JSON.stringify(form))
        try {
            await fetch('/api/links', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
            setSuccess(true)
        }
        catch (err) {
            console.log(err)
        } finally {
            setSuccess(true)
        }
    }

    return (
        <div className="postForm">
            <h1 style={{
                display: 'flex',
                alingItem: 'center',
                justifyContent: 'center', backgroundColor: '#0d0d0d', margin: 0
            }}> <button
                className='backBtn'
                onClick={() => {
                    router.back()
                }}
            >back</button> Add a new Link</h1>
            {
                success && <div className="success">
                    <p >Link added Successfully</p>
                </div>
            }
            <form action="">
                <div>
                    <label htmlFor="title">Link Title :</label>
                    <input type="text" onChange={e => {
                        setForm({ ...form, title: e.target.value })
                    }} />
                </div>
                <div>
                    <label htmlFor="des">the Link</label>
                    <textarea type="text" rows={10} onChange={e => {
                        setForm({ ...form, description: e.target.value })
                    }} />
                </div>
                <div>
                    <button type='submit' className="btnLogin" onClick={handlePost}>Add</button>
                </div>
            </form>
        </div>
    )
}
