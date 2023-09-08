import Head from 'next/head';
import React from 'react'
import Card from '../../components/card';
import { connectToDatabase } from '../../util/mongodb';

export default function index({ initialPosts, allPosts, url }) {
    return (<section>
        <section></section>
        <section id='details'>
            <Head>
                <title>
                    {initialPosts.title} | Sinthiya Telecom
                </title>
                <meta property="og:title" content={initialPosts.title + " _ All offer in one website, gp, robi, airtel, bl, teletalk || Sinthiya Telecom"} />
                <meta property="og:description" content={initialPosts.description + "In our website you will find all the recharge offer (mb offer, minutes offer). And yes we provide online offer recharge, here are some cool offers today! Grameenphone, Robi, Airtel, Banglalink, Teletalk || Sinthiya Telecom"} />
                <meta property="og:url" content={encodeURI(url)} />
                <meta property="og:type" content="website" />
            </Head>
            <div>
                <h1>{initialPosts.title}</h1>
            </div>
            <div>
                <p>{initialPosts.description}</p>
            </div>
        </section>
        <section style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#0d0d0d' }}>
            <h2>Other Offers</h2>
        </section>
        <section id='offer'>

            {allPosts.map(post => {
                return <Card data={post} key={post._id} />
            })}
        </section>
    </section>
    )
}
export async function getServerSideProps(context) {
    const { db } = await connectToDatabase();
    const posts = await db
        .collection("posts")
        .findOne({ "title": context.query.title })
    const allPosts = await db.collection('posts').find({}).sort({ metacritic: -1 }).toArray()
    return {
        props: {
            initialPosts: JSON.parse(JSON.stringify(posts)),
            allPosts: JSON.parse(JSON.stringify(allPosts)),
            url: `https://sinthiyatelecom.xyz/offer/${context.query.title}`
        },
    };
}