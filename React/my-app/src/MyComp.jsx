import { useState } from "react";
export default function MyComp(props) {

    const [count,setCount] = useState(0);

    function handleClick(){
        setCount(count + 1);
    }
    return (
        <>
        <h1>hello {props.name}</h1>
        <p>you clicked {count} times</p>
        <button onClick={handleClick}>click me</button>
        </>
    );
}