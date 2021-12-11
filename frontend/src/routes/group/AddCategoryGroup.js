import { useState } from "react"
import { Select, Button } from "@chakra-ui/react"
import url from "../../components/urlSettings"

const AddCategoryGroup = ({id, hobby}) => {
    const [category, setCategory] = useState(hobby !== undefined?hobby:'wybierz')
    const cate = ['sport', 'gry', 'nauka', 'muzyka', 'tech', 'auta', 'moda', 'zwierzęta', 'sztuka', 'biznes', 'jedzenie']
    const result = cate.map(val=><option value={val} key={val}>{val}</option>)

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/${id}/category/${category}`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }})
    }
    return(
        <>
        <label style={{fontWeight: '600'}}>
        Wybierz kategorie
        <Select placeholder='Wybierz' value={category} onChange={(e)=>setCategory(e.target.value)} marginBottom='10px'>
            {result}
        </Select>
        </label>
        <Button onClick={handleClick} size='sm'>Zapisz</Button>
        </>
    )
}

export default AddCategoryGroup