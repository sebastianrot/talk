import './Hot.css'
import { useState, useEffect } from "react"
import Post from "../../components/posts/Post"
import Home from './Home'
import Loading from "../../components/Loading"
import url from "../../components/urlSettings"

const Hot = () => {
    const [posts, setPosts] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/hot`,{
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setPosts(data)
            setLoading(false)
        }).catch(err=>{
            setLoading(false)
        })
    },[])

    if(loading) return <Loading/>

    const result = posts.map(val=><Post key={val._id} value={val}/>)

    return(
        <section className='hot-section'>
            <Home/>
            <div style={{width: '100%'}}>
            {result}
            </div>
        </section>
    )
}

export default Hot