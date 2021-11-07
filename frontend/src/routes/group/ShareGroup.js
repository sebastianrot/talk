import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share"
import url from "../../components/urlSettings"

const ShareGroup = ({id}) => {
    const link = `${url.clientUrl}/group/${id}`
    const handleClick = () => {
        navigator.clipboard.writeText(link)
    }
    return(
        <div>
        <button onClick={handleClick}>Udostępnij</button>
        <FacebookShareButton url={'https://reddit.com'}>Facebook</FacebookShareButton>
        <TwitterShareButton url={link}>Twitter</TwitterShareButton>
        <WhatsappShareButton url={link}>Whatsapp</WhatsappShareButton>
        </div>
    )
}

export default ShareGroup