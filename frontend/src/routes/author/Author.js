import './Author.css'
import { Text } from "@chakra-ui/react"

const Author = () => {
    return(
        <section className='author-section'>
            <Text marginBottom='5px' fontWeight='600'>Witam was wszystkich na mojej platformie. Została stworzona do pomocy w znalezieniu osób o tych samych zainteresowanich.
                Mam nadzieje, że dzięki społeczności rozwiniecie swoje pasje.</Text>
            <Text marginBottom='5px' fontWeight='600'>Jeśli chcecie się skontaktować ze mną piszcie na maila: sebastianrot24@gmail.com</Text>
            <Text fontWeight='600'>Pozdrawiam Sebastian Rot</Text>
        </section>
    )
}

export default Author