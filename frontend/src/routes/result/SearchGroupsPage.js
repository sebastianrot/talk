import './SearchGroupsPage.css'
import { useState, useEffect } from 'react'
import NavSearch from "./NavSearch"
import {useNavigate, useLocation} from 'react-router-dom'
import { Tooltip, Text } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../../components/Loading'
import { ReactComponent as VerifiedLogo} from '../../components/svg/verified.svg'
import url from "../../components/urlSettings"

const SearchGroupsPage = () => {
    const [data, setData] = useState()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(2)
    const [hasMore, setHasMore] = useState(true)
    let navigate = useNavigate()
    const location = useLocation()

    const partText = (str) => {
        if (str.length > 40) {
            return (str.substring(0, 40) + "...");
        }
        else {
            return str;
        }
    }

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/search/groups${location.search}&page=1`)
        .then(res => res.json())
        .then(res =>{
            setData(res)
            setLoading(false)})
        .catch(err=>{
            setError(true)
            setLoading(false)})
    },[location])

    const fetchSearch = async () =>{
        try{
            const res = await fetch(`${url.serverUrl}/api/search/groups${location.search}&page=${page}`,{
                credentials: 'include'
            })
            const data = await res.json()
            setData(prev=>[...prev, ...data])
            if(data.length === 0 || data.length < 15){
                setHasMore(false)
            }
            setPage(prev=>prev+1)
        }catch(err){
            setHasMore(false)
        }
        }

        if(loading) return <Loading/>

        if(error) return <span>404</span>

        if(data.length === 0) return <section className='searchgroupspage-section'><span style={{fontWeight:600, fontSize:'35px', margin: 'auto'}}>404</span></section>

    const result = data.map(val=>(<div className='searchgrouppage-div' key={val._id} onClick={()=>navigate(`/group/${val._id}`)}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
    <img src={`${url.serverUrl}/static/profilegroup/${val.img !== '' ? val.img : 'default.png'}`} alt='profile' style={{width: '42px', borderRadius: '50%'}}/>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px', justifyContent: 'center'}}>
    <div style={{display: 'flex', alignItems: 'center'}}>
    <Text fontSize='md' fontWeight='600'>{val.name}</Text>
    <div style={{marginLeft: '3px'}}>
    {val.verified && <Tooltip hasArrow label='weryfikacja'><VerifiedLogo/></Tooltip>}
    </div>
    </div>
    <Text fontSize='sm'>{partText(val.desc)}</Text>
    </div>
    </div>))

    return(
        <section className='searchgroupspage-section'>
            <NavSearch/>
            <InfiniteScroll
            dataLength={data.length}
            next={fetchSearch}
            hasMore={hasMore}
            loader={<Loading/>}
            style={{overflow: 'hidden'}}>
            {result}
            </InfiniteScroll>
        </section>
    )
}

export default SearchGroupsPage