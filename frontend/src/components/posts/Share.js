import url from "../urlSettings"

const Share = ({id}) => {

    const handleClick = () => {
        const link = `${url.clientUrl}/p/${id}`
        navigator.clipboard.writeText(link)
    }

    return(
        <button onClick={handleClick}>Udostępnij</button>
    )
}

export default Share