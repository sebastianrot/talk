import {useState, useEffect} from 'react'

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const changeWindowSize = () =>{
        setWindowSize({width: window.innerWidth, height: window.innerHeight})
    }

    useEffect(()=>{
        window.addEventListener('resize', changeWindowSize)

        return () =>{
            window.removeEventListener('resize', changeWindowSize)
        }
    },[])

    return windowSize
}