import { Spinner } from "@chakra-ui/spinner"

const Loading = () => {
   return(
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Spinner
         thickness='3px'
         speed='0.65s'
         emptyColor='gray.200'
         color='blue.500'
         size='md'
         />
      </div>
   ) 
}

export default Loading