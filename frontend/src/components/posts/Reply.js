import Like from "./Like"
import Replied from './Replied'
import AddComment from "./AddComment"

const Reply = ({value}) => {
    const result = value.replies.map(val=><Replied key={val._id} val={val}/>)
    return(
        <div style={{marginLeft: '20px'}}>
        <span>{value.text}</span>
        <span>{value.by.username}</span>
        <Like id={value._id} option={'comment'} liked={value.liked} number={value.like}/>
        <AddComment id={value.post} parent={value._id}/>
        {result}
        </div>
    )
}

export default Reply