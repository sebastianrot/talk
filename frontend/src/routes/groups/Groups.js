import {useState, useEffect} from 'react'
import CreateGroups from '../group/CreateGroup'
import Loading from '../../components/Loading'
import url from '../../components/urlSettings'

const Groups = () => {
    const [groups, setGroups] = useState()
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState('all')

    useEffect(()=>{ 
        fetch(`${url.serverUrl}/api/groups?q=${category}`,{
            credentials: 'include'
        }).then(res=>res.json())
        .then(data=>{
            setGroups(data.groups)
            setLoading(false)
        }).catch(err=>setLoading(false))
    },[category])

    if(loading) return <Loading/>

    const result = groups.map(current=><span>{current.name}</span>)

    return(
        <main>
            <label>
                Wybierz kategorie
                <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                        <option value="all">All</option>
                        <option value="sport">Sport</option>
                        <option value="gry">Gry</option>
                        <option value="nauka">Nauka</option>
                        <option value="muzyka">Muzyka</option>
                </select>
        </label>
            tu są grupy
            <CreateGroups/>
            {result}
        </main>
    )
}

export default Groups