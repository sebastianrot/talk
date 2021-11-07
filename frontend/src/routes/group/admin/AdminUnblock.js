import Accept from "./Accept"
import Reject from "./Reject"

const AdminUnblock = ({id, user}) => {
	return(
	<div>
		<Accept id={id} user={user}/>
		<Reject id={id} user={user}/>
	</div>
)
}

export default AdminUnblock