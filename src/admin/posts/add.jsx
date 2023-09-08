import { useEffect, useState } from "react"
import Router, { useRouter } from "next/router"
import { useAuthContext } from "../../../context/AuthContext"
export default function Add() {
    const { user } = useAuthContext()
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
            await fetch('/api/posts', {
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
    useEffect(() => {
        if (!user) {
            router.push('/admin/login')
        }
    }, [router, user])
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
            >back</button> Add a new Post</h1>
            {
                success && <div className="success">
                    <p >Post added Successfully</p>
                </div>
            }
            <form action="">
                <div>
                    <label htmlFor="title">post Title :</label>
                    <input type="text" onChange={e => {
                        setForm({ ...form, title: e.target.value })
                    }} />
                </div>
                <div>
                    <label htmlFor="des">Descrition</label>
                    <textarea type="text" rows={10} onChange={e => {
                        setForm({ ...form, description: e.target.value })
                    }} />
                </div>
                <div>
                    <button type='submit' className="btnLogin" onClick={handlePost}>Post</button>
                </div>
            </form>
        </div>
    )
}
