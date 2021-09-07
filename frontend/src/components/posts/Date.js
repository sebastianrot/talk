
const DatePost = ({value}) => {
    const date = new Date(value)

    const month = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 
    'lip', 'sie', 'wrz', 'paź', 'lis', 'gru']

    const isToday = (someDate) => {
        const today = new Date()
        return someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
    }

    const today = isToday(date)
    const seconds = Math.floor((new Date() - date) / 1000)
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor(seconds / 60)
    const checkToday = () => {
        if(hours >= 1) {
            return `${hours} godz`
        } else {
            return `${minutes} min`
        }
    }
    const ago = checkToday()

    return(
        <div>
        <span>{today ? ago : date.getDate()}</span>
        <span>{!today && month[date.getMonth()]}</span>
        </div>
    )
}

export default DatePost