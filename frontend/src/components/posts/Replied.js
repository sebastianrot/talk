import Comment from './Comment'

const Replied = ({value, id}) => {
  
    return(
        <div style={{paddingLeft: '20px'}}>
        <Comment value={value} id={id}/>
        </div>
    )
}

export default Replied