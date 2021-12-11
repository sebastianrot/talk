import { useState, useContext } from "react"
import { Input, Checkbox, Select, Button, Text, Textarea } from "@chakra-ui/react"
import { Redirect } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import url from "../../components/urlSettings"

const CreateGroup = () => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [priv, setPriv] = useState(false)
    const [hide, setHide] = useState(false)
    const [nsfw, setNsfw] = useState(false)
    const [category, setCategory] = useState()
    const [create, setCreate] = useState(false)
    const {myUser} = useContext(AuthContext)

    const handleClick = () => {
        fetch(`${url.serverUrl}/api/group/create`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, desc, priv, hide, nsfw, category})
        })
        .then(res=>res.json())
        .then(data=>setCreate(data.add))
    }

    if(create) return <Redirect to={`/user/${myUser.username}/groups`}/>

    const cate = ['sport', 'gry', 'nauka', 'muzyka', 'tech', 'auta', 'moda', 'zwierzęta', 'sztuka', 'biznes', 'jedzenie']
    const result = cate.map(val=><option value={val} key={val}>{val}</option>)
    return(
        <main style={{display: 'flex',
            alignItems: 'center',
            paddingTop: '60px'}}>
        <article style={{display: 'flex', flexDirection: 'column',margin: 'auto', padding: '25px 50px 30px 50px', background: '#fff',
        boxShadow: '0 4px 40px rgba(0,0,0,.15)', width: '600px', borderRadius: '10px'}}> 
            <Text fontSize='lg' fontWeight='600' margin='auto'>Stwórz grupe</Text> 
            <Text fontSize='md' fontWeight='600' marginTop='10px'>Nazwa</Text>
            <Input type='text' placeholder='Podaj nazwe' value={name} onChange={(e)=>setName(e.target.value)}/>
            <Text fontWeight='600' marginTop='10px'>Opis</Text>
            <Textarea placeholder='Podaj opis' value={desc} onChange={(e)=>setDesc(e.target.value)}/>
            <Checkbox checked={priv} onChange={(e)=>setPriv(e.target.checked)} marginTop='10px' fontWeight='600'>Prywatna</Checkbox>
            {priv && <Checkbox checked={hide} onChange={(e)=>setHide(e.target.checked)} marginTop='10px' fontWeight='600'>Ukryta</Checkbox>}
            <Checkbox checked={nsfw} onChange={(e)=>setNsfw(e.target.checked)} marginTop='10px' fontWeight='600'>Nsfw</Checkbox>
            <label style={{marginTop: '10px', fontWeight: '600'}}>
          Wybierz kategorie
          <Select placeholder='Wybierz' value={category} onChange={(e)=>setCategory(e.target.value)}>
               {result}
         </Select>
        </label>
        <Button onClick={handleClick} marginTop='15px' style={{background: '#1071fe', color: '#fff'}}>Stwórz</Button>
        </article>
        </main>
    )
}

export default CreateGroup