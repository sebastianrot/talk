import {FacebookShareButton, TwitterShareButton, 
    WhatsappShareButton} from 'react-share'
import url from "../urlSettings"

const Share = ({id}) => {
    const link = `${url.clientUrl}/p/${id}`
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

export default Share