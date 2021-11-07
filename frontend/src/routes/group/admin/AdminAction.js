import Reject from "./Reject"
import Block from "./Block"

const AdminAction = ({id, user}) => {
    return(
        <div>
            <Reject id={id} user={user}/>
            <Block id={id} user={user}/>
        </div>
    )
}

export default AdminAction