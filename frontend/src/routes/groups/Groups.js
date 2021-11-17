import {useState, useEffect} from 'react'
import GroupsResults from './GroupsResults'
import Loading from '../../components/Loading'
import url from '../../components/urlSettings'

const Groups = () => {
    const [groups, setGroups] = useState()
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState('recommended')
    const [error, setError]  = useState(false)

    useEffect(()=>{ 
        fetch(`${url.serverUrl}/api/groups?q=${category}`,{
            credentials: 'include'
        }).then(res=>res.json())
        .then(data=>{
            setGroups(data.groups)
            setError(false)
            setLoading(false)
        }).catch(err=>{
            setError(true)
            setLoading(false)})
    },[category])

    if(loading) return <Loading/>

    const cate = ['sport', 'gry', 'nauka', 'muzyka', 'tech', 'auta', 'moda', 'zwierzęta', 'sztuka', 'biznes', 'jedzenie']
    const result = cate.map(val=><option value={val} key={val}>{val}</option>)

    return(
        <main>
            <label>
                Wybierz kategorie
                <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                     {result}
                </select>
        </label>
            tu są grupy
            <GroupsResults value={groups} error={error}/>
        </main>
    )
}

export default Groups