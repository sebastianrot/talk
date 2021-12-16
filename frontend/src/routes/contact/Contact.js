import './Contact.css'
import { Text } from "@chakra-ui/react"

const Contact = () =>{
    return(
        <section className='contact-section'>
            <Text marginBottom='15px' fontWeight='600'>Jeżeli znaleźliście jakis błąd na stronie piszcie na maila 
                podanego poniżej z tematem: 'Bug'</Text>
            <Text marginBottom='15px' fontWeight='600'>Jeżeli macie jakąś propozycje co do rozwijania strony piszcie na maila 
                podanego poniżej z tematem: 'Dodać'</Text>
            <Text marginBottom='15px' fontWeight='600'>Jeżeli macie pytanie związane z stroną lub firmą 
            piszcie na maila podanego poniżej z tematem: 'Pytanie'</Text>
            <Text marginBottom='15px' fontWeight='700'>email: linnkappofficial@gmail.com</Text>
        </section>
    )
}

export default Contact