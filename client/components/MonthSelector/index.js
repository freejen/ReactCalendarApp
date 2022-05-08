import { Shake } from 'reshake'
import { useState } from "react"

const MonthSelector = (props) => {
    const [month, setMonth] = useState(props.month)
    const [shaking, setShaking] = useState(false)

    const shakeText = () => {
        setShaking(true)
        setTimeout(() => {setShaking(false)}, 300)
    }    

    return (
        <>
            <Shake
            h={5}
            v={0}
            r={0}
            dur={300}
            int={10}
            max={100}
            fixed={true}
            active={shaking}>
                <h1>{month}</h1>
            </Shake>

            <button onClick={shakeText}>&lt;</button> 
            <button onClick={shakeText}>&gt;</button>
        </>
    );
}

export default MonthSelector;