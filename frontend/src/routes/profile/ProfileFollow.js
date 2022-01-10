import './ProfileFollow.css'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Text, Tooltip } from "@chakra-ui/react"
import Loading from "../../components/Loading"
import InfiniteScroll from 'react-infinite-scroll-component'
import { ReactComponent as VerifiedLogo} from '../../components/svg/verified.svg'
import url from "../../components/urlSettings"

const ProfileFollow = ({id}) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(2)
    const [hasMore, setHasMore] = useState(true)
    let navigate = useNavigate()

    useEffect(()=>{
        fetch(`${url.serverUrl}/api/user/${id}/follow?page=1`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{
            setUser(data)
            setLoading(false)
        }).catch(err=>{
            setLoading(false)
        })
    },[id])

    if(loading) return <Loading/>

    const partText = (str) => {
        if (str.length > 30) {
            return (str.substring(0, 30) + "...");
        }
        else {
            return str;
        }
    }

    const fetchData = async () =>{
        try{
            const res = await fetch(`${url.serverUrl}/api/user/${id}/follow?page=${page}`,{
                credentials: 'include'
            })
            const data = await res.json()
            setUser(prev=>[...prev, ...data])
            if(data.length === 0 || data.length < 15){
                setHasMore(false)
            }
            setPage(prev=>prev+1)
        }catch(err){
            setHasMore(false)
        }
        }

    const result = user.map(val=><div className='userfollow-div' key={val._id} onClick={()=>navigate(`/user/${val.user.username}`)}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
    <img src={`${url.serverUrl}/static/profile/${val.user.img !== '' ? val.user.img : 'default.jpg'}`} alt='profile' style={{width: '42px', borderRadius: '50%'}}/>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px', justifyContent: 'center'}}>
    <div style={{display: 'flex', alignItems: 'center'}}>
    <Text fontSize='md' fontWeight='600'>{val.user.username}</Text>
    <div style={{marginLeft: '3px'}}>
    {val.user.verified && <Tooltip hasArrow label='weryfikacja'><VerifiedLogo/></Tooltip>}
    </div>
    </div>
    <Text fontSize='sm'>{partText(val.user.desc)}</Text>
    </div>
    </div>)

    return(
        <section className='userfollow-section'>
            <InfiniteScroll
            dataLength={user.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<Loading/>}
            style={{overflow: 'hidden'}}>
            {result}
            </InfiniteScroll>
        </section>
    )
}

export default ProfileFollow