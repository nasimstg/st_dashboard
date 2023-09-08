import { connectToDatabase } from '../../../util/mongodb'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuthContext } from '../../../context/AuthContext'


const Lint = ({ data, input }) => {
  const filteredData = data.filter((el) => {
    if (input === '') {
      return el;
    }
    else {
      return (el.title.toLowerCase().includes(input) || el.description.toLowerCase().includes(input))
    }
  })
  const removePost = async (id) => {
    try {
      await fetch('/api/delLink',
        {
          method: 'DELETE',
          body: id,
        }
      )
    } catch (err) {
      console.log(err)
    }
  }
  return <section>
    {filteredData?.map((e, i) => {
      return <div className='LinkContainer' key={e._id} style={{
        display: 'flex', alingItem: 'center', justifyContent: 'center', margin: '15px 0'
      }}>
        <p style={{ margin: '5px 0' }}>{i}: {e.title}</p>
        <p>
          Link: <Link href={e.description} target='_blank'>{e.description}</Link>
        </p>
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
  </section>
}

export default function Index({ initialPosts }) {
  const { user } = useAuthContext()
  const [posts, setPosts] = useState([...initialPosts])
  const router = useRouter()
  const [inputTxt, setInputText] = useState('')

  const handleChange = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }


  useEffect(() => {
    if (!user) {
      router.push('/admin/login')
    }
  }, [router, user])
  return (
    <section className='postsContainer'>
      <h1 style={{ display: 'flex', alingItem: 'center', justifyContent: 'center' }}> <button
        className='backBtn'
        onClick={() => {
          router.back()
        }}
      >back</button> Links</h1>
      <div className='OffersContainer'>
        <button className='refressBtn'
          onClick={() => {
            router.push('/admin/links/add')
          }}
        >Add a new Link</button>
        <form action="">
          <div>
            <input type="text" placeholder='search Links' onChange={handleChange} />
          </div>
        </form>
        <Lint data={posts} input={inputTxt} />
      </div>
    </section>
  )
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const posts = await db
    .collection("links")
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