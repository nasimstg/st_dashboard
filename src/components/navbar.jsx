import Link from "next/link"
export default function Navbar() {

    return (
        <nav>
            <div><Link href="/">St_Dashboard</Link></div>
            <div>
                <ul>
                    <li><Link href="/balance">Balance</Link></li>
                    <li><Link href="/paunadar">Paunadar</Link></li>
                    <li><Link href="/denadar">Denadar</Link></li>
                </ul>
            </div>
        </nav>
    )
}