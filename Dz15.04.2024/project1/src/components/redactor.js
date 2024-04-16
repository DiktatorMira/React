import React, { useState } from 'react';

export default function Redactor() {
  const [textStyle, setTextStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
    uppercase: false,
    lineThrough: false
  });

  const handleStyleChange = (style) => {
    setTextStyle((prevStyles) => ({
      ...prevStyles,
      [style]: !prevStyles[style]
    }));
  };

  const applyStyle = () => {
    let styleString = '';
    if (textStyle.bold) styleString += 'bold ';
    if (textStyle.italic) styleString += 'italic ';
    if (textStyle.underline) styleString += 'underline ';
    if (textStyle.uppercase) styleString += 'uppercase ';
    if (textStyle.lineThrough) styleString += 'line-through ';

    const textElement = document.querySelector('.text');
    textElement.style.fontWeight = textStyle.bold ? 'bold' : 'normal';
    textElement.style.fontStyle = textStyle.italic ? 'italic' : 'normal';
    textElement.style.textDecoration = textStyle.underline ? 'underline' : 'none';
    textElement.style.textTransform = textStyle.uppercase ? 'uppercase' : 'none';
    textElement.style.textDecoration = textStyle.lineThrough ? 'line-through' : 'none';
  };

  return (
    <>
      <section className='firstplate'>
        <div className='forbut'>
          <input className='btn' type='button' value='bold' onClick={() => {
              handleStyleChange('bold');
              applyStyle();
            }}/>
          <input  className='btn' type='button' value='italic' onClick={() => {
              handleStyleChange('italic');
              applyStyle();
            }}/>
          <input className='btn' type='button' value='underline' onClick={() => {
              handleStyleChange('underline');
              applyStyle();
            }}/>
          <input className='btn' type='button' value='uppercase' onClick={() => {
              handleStyleChange('uppercase');
              applyStyle();
            }}/>
          <input className='btn' type='button' value='line-through' onClick={() => {
              handleStyleChange('lineThrough');
              applyStyle();
            }}/>
        </div>
        <div className='controls'>
          <select className='inputs' onChange={(e) => {document.querySelector('.text').style.fontSize = e.target.value + 'px'}}>
            <option value="12">12px</option>
            <option value="16">16px</option>
            <option value="20">20px</option>
          </select>
          <input className='inputs' type="color" onChange={(e) => {document.querySelector('.text').style.color = e.target.value}} />
        </div>
        <textarea className='text'></textarea>
        <button className='btn' onClick={() => {
          const commentText = document.querySelector('.text').value;
          const commentDiv = document.createElement('div');
          commentDiv.innerText = commentText;
          document.querySelector('.comments').appendChild(commentDiv);
        }}>
          Комментировать
        </button>
      </section>
      <div className="comments"></div>
    </>
  );
}