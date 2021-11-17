
const GroupsResults = ({value, error}) => {

    if(error) return <span>Nie ma grup z taką kategorią</span>

    const result = value.map(current=><span key={current._id}>{current.name}</span>)
    return(
        <article>
            {result}
        </article>
    )
}

export default GroupsResults