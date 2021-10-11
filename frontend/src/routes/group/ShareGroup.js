import url from "../../components/urlSettings"

const ShareGroup = ({id}) => {
    const handleClick = () => {
        const link = `${url.clientUrl}/group/${id}`
        navigator.clipboard.writeText(link)
    }
    return(
        <button onClick={handleClick}>Zaproś</button>
    )
}

export default ShareGroup