import Replied from './Replied'
import Comment from './Comment'

const Reply = ({value}) => {
    const result = value.replies.map(val=><Replied key={val._id} value={val} id={value._id}/>)
    return(
        <div style={{paddingLeft: '20px'}}>
        <Comment value={value} id={value._id}/>
        {result}
        </div>
    )
}

export default Reply