import {FacebookShareButton, TwitterShareButton, 
    WhatsappShareButton} from 'react-share'
import url from '../../components/urlSettings'

const SharePostGroup = ({id, group}) => {
    const link = `${url.clientUrl}/group/${group}/p/${id}`
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

export default SharePostGroup 