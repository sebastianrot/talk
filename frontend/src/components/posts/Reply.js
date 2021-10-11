
const Reply = ({value}) => {
    return(
        <div style={{marginLeft: '20px'}}>
        <span>{value.text}</span>
        <span>{value.by.username}</span>
        </div>
    )
}

export default Reply