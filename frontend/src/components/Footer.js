import './Footer.css'
import { Text } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'
import {FaTwitter, FaYoutube, FaInstagram} from 'react-icons/fa'

const Footer = () => {
    const twitter = 'https://twitter.com/linnkgroup'
    const yt = 'https://www.youtube.com/channel/UCZ599vSZSCHC-eDBo9xcHAg'
    const insta = 'https://www.instagram.com/linnkofficial/'
    return(
        <section className='footer-section'>
        <div style={{maxWidth: '600px', margin: 'auto', display: 'flex', justifyContent: 'space-between', color: '#23272a'}}>
            <div>
                <Text fontWeight='700'>Social Media</Text>
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                <FaTwitter fontSize='24px' onClick={()=>window.location.href=twitter}/>
                <FaYoutube fontSize='24px' onClick={()=>window.location.href=yt}/>
                <FaInstagram fontSize='23px' onClick={()=>window.location.href=insta}/>
                </div>
            </div>
            <div>
                <Text fontWeight='700'>Firma</Text>
                <Text><Link to={`/author`}>Twórca</Link></Text>
                <Text><Link to={`/contact`}>Kontakt</Link></Text>
            </div>
            <div>
                <Text fontWeight='700'>Polityka</Text>
                <Text>Warunki</Text>
                <Text>Polityka</Text>
            </div>
        </div>
        </section>
    )
}

export default Footer