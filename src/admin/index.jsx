'use client'
import { useAuthContext } from "../../context/AuthContext"
import Link from "next/link"
import Router from "next/router"
import { useEffect } from "react"
import Head from "next/head"

export default function Admin() {
    const { user, logout } = useAuthContext()
    console.log(user)

    const handleLogout = async () => {
        try {
            await logout()
            Router.push('/admin/login')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (!user) {
            Router.push('/admin/login')
        }
    }, [user])

    return <section className="adminContainer">
        <Head>
            <title>Admin Dashboard</title>
        </Head>
        <div className="linksContainer">
            <Link href="/admin/posts">Posts</Link>
            <Link href="/admin/links">myLinks</Link>
        </div>
        <div>
            <div>Logged in As {user && user.email}</div>
            <div><button onClick={handleLogout}>Logout</button></div>
        </div>

    </section>
}