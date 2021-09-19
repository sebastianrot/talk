import { useState } from "react"
import url from "../../components/urlSettings"

const CreateGroup = () => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [priv, setPriv] = useState(false)
    const [category, setCategory] = useState('sport')

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/create`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, desc, priv, category})
        })
    }

    return(
        <article>
            <input type='text' placeholder='Podaj nazwe' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type='text' placeholder='Podaj opis' value={desc} onChange={(e)=>setDesc(e.target.value)}/>
            <label>
                Prywatna
            <input type='checkbox' checked={priv} onChange={(e)=>setPriv(e.target.checked)} />
            </label>
            <label>
          Wybierz kategorie
          <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value="sport">Sport</option>
                <option value="gry">Gry</option>
                <option value="nauka">Nauka</option>
                <option value="muzyka">Muzyka</option>
          </select>
        </label>
        <button onClick={handleClick}>Stwórz</button>
        </article>
    )
}

export default CreateGroup