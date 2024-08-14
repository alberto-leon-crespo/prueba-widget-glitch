import React, { useState } from 'react';
import {Link} from "react-router-dom";

// Definimos una interfaz para las props si es necesario, en este caso no hay props.
interface CounterProps {}

const Counter: React.FC<CounterProps> = () => {
    // Definimos un estado local con useState y tipamos el estado como un número.
    const [count, setCount] = useState<number>(0);

    // Función que incrementa el valor del contador.
    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <nav>
                <Link to="/">Back to main</Link>
            </nav>
            <br />
            <h2>Counter: {count}</h2>
            <button onClick={increment}>Increment</button>
            <br />
        </div>
    );
};

export default Counter;
