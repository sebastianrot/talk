import { useState } from "react"
import url from "../../components/urlSettings"

const AddCategory = ({hobby}) => {
    const [category, setCategory] = useState(hobby !== undefined?hobby:'wybierz')
    const cate = ['wybierz', 'sport', 'gry', 'nauka', 'muzyka', 'tech', 'auta', 'moda', 'zwierzęta', 'sztuka', 'biznes', 'jedzenie']
    const result = cate.map(val=><option value={val} key={val}>{val}</option>)

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/user/category/${category}`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }})
    }
    return(
        <>
        <label>
        Wybierz kategorie
        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            {result}
        </select>
        </label>
        <button onClick={handleClick}>Zapisz</button>
        </>
    )
}

export default AddCategory