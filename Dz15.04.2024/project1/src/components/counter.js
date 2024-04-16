import React, { useState } from 'react';

export default function Counter() {
    const [value, setValue] = useState(0);
    const handleIncrement = (amount) => { setValue(value + amount); };
    const handleDecrement = (amount) => { setValue(value - amount); };
    return (
        <section className='secondplate'>
            <ValueDisplay value={value} />
            <div className='forbut'>
                <ActionButton onClick={() => handleIncrement(1)} label="+1"/>
                <ActionButton onClick={() => handleIncrement(10)} label="+10"/>
                <ActionButton onClick={() => handleDecrement(100)} label="-100"/>
                <ActionButton onClick={() => handleIncrement(25)} label="+25"/>
            </div>
        </section>
    );
}
function ValueDisplay({ value }) { return <h2>Значение: {value}</h2>; }
function ActionButton({ onClick, label }) {
    return (
        <input className='buttons' type='button' value={label} onClick={onClick}/>
    );
}