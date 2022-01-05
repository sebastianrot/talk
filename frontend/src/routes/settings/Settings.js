import './Settings.css'
import { Accordion, AccordionButton, AccordionItem, 
    Box, Text, AccordionPanel, AccordionIcon } from "@chakra-ui/react"
import ChangePassword from "./ChangePassword"

const Settings = () => {
    return(
        <section className='section-settings'>
            <Accordion allowMultiple>
            <AccordionItem border='none'>
                <h2>
                <AccordionButton>
                    <Box flex='1' textAlign='left'>
                    <Text fontWeight='600'>Zmiana hasła</Text>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                <ChangePassword/>
                </AccordionPanel>
            </AccordionItem>
            </Accordion>
        </section>
    )
}

export default Settings