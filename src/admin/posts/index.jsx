import { connectToDatabase } from '../../../util/mongodb'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/AuthContext'

export default function Index({ initialPosts }) {
  const { user } = useAuthContext()
  const [posts, setPosts] = useState([...initialPosts])
  const router = useRouter()
  const removePost = async (id) => {
    try {
      await fetch('/api/del',
        {
          method: 'DELETE',
          body: id,
        }
      )
    } catch (err) {
      console.log(err)
    }
    finally {
      setPosts(oldValues => {
        return oldValues.filter((e) => e._id !== id)
      })
    }
  }

  useEffect(() => {
    if (!user) {
      router.push('/admin/login')
    }
  })
  return (
    <section className='postsContainer'>
      <h1 style={{ display: 'flex', alingItem: 'center', justifyContent: 'center' }}> <button
        className='backBtn'
        onClick={() => {
          router.back()
        }}
      >back</button> Posts</h1>
      <div className='OffersContainer'>
        <button className='refressBtn'
          onClick={() => {
            router.push('/admin/posts/add')
          }}
        >Add a new Offer</button>
        {posts?.map((e, i) => {
          return <div className='postContainer' key={e._id} style={{
            display: 'flex', alingItem: 'center', justifyContent: 'center', margin: '15px 0'
          }}>
            <p style={{ margin: '5px' }}>{i}: {e.title}</p>
            <button style={{
              backgroundColor: 'crimson',
              padding: '8px 12px',
              fontSize: '1rem',
              color: 'white',
              cursor: 'pointer'
            }}
              onClick={() => {
                removePost(e._id)
              }}
            >Remove</button>
          </div>
        })}
      </div>
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