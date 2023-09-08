import Head from "next/head";
import Card from "../../components/card";
import { connectToDatabase } from "../../util/mongodb";

export default function offer({ initialPosts }) {
    return (
        <section id='offer'>
            <Head>
                <title>All offers || Sinthiya Telecom</title>
                <meta property="og:title" content="All offer in one website, gp, robi, airtel, bl, teletalk || Sinthiya Telecom" />
                <meta property="og:description" content="In our website you will find all the recharge offer (mb offer, minutes offer). And yes we provide online offer recharge, here are some cool offers today! Grameenphone, Robi, Airtel, Banglalink, Teletalk || Sinthiya Telecom" />
                <meta property="og:url" content="https://sinthiyatelecom.xyz/offer" />
                <meta property="og:type" content="website" />
            </Head>
            {initialPosts.length == 0 && <p>Ooops! No Offer Available</p>}
            {initialPosts.map(post => {
                return <Card data={post} key={post._id} />
            })}
        </section>
    )
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const posts = await db
        .collection("posts")
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();

    return {
        props: {
            initialPosts: JSON.parse(JSON.stringify(posts)),
        },
    };
}
