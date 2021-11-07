import Like from "./Like"

const Replied = ({val}) => {
    return(
        <div style={{marginLeft: '20px'}}>
        <span>{val.text}</span>
        <span>{val.by.username}</span>
        <Like id={val._id} option={'comment'} liked={val.liked} number={val.like}/>
        </div>
    )
}

export default Replied