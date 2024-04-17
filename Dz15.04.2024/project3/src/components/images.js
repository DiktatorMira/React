import React, { useState, useRef } from 'react';

export default function Images() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [filters, setFilters] = useState({
        blur: 0,
        brightness: 100,
        contrast: 100,
        grayscale: 0,
        hue_rotate: 0,
        invert: 0,
        opacity: 100,
        saturate: 100,
        sepia: 0
    });
    const [savedImages, setSavedImages] = useState([]);
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef(null);

    const handleChangePhoto = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result);
            setImageLoaded(true);
        };
        reader.readAsDataURL(file);
    };

    const handleChange = e => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [e.target.name]: e.target.value
        }));
        applyFilters();
    };

    const applyFilters = () => {
        if (selectedImage && imageRef.current) {
            const { blur, brightness, contrast, grayscale, hue_rotate, invert, opacity, saturate, sepia } = filters;
            const filterStyle = `
                blur(${blur}px)
                brightness(${brightness}%)
                contrast(${contrast}%)
                grayscale(${grayscale}%)
                hue-rotate(${hue_rotate}deg)
                invert(${invert}%)
                opacity(${opacity}%)
                saturate(${saturate}%)
                sepia(${sepia}%)
            `;
            imageRef.current.style.filter = filterStyle;
        }
    };

    const handleSave = () => {
        if (selectedImage) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.filter = getFilterString();
                ctx.drawImage(img, 0, 0, img.width, img.height);
                const savedImageUrl = canvas.toDataURL();
                setSavedImages(prevImages => [...prevImages, savedImageUrl]);
            };
            img.src = selectedImage;
        }
    };

    const getFilterString = () => {
        const { blur, brightness, contrast, grayscale, hue_rotate, invert, opacity, saturate, sepia } = filters;
        return `
            blur(${blur}px)
            brightness(${brightness}%)
            contrast(${contrast}%)
            grayscale(${grayscale}%)
            hue-rotate(${hue_rotate}deg)
            invert(${invert}%)
            opacity(${opacity}%)
            saturate(${saturate}%)
            sepia(${sepia}%)
        `;
    };

    return (
        <>
            <section className='top'>
                <div className='left'>
                    <img ref={imageRef} className='image' alt='' src={selectedImage}></img>
                    <div className="file-wrapper">
                        <label htmlFor="file" className="file-button">Выбрать файл</label>
                        <input id="file" type="file" className="file-input" onChange={handleChangePhoto} />
                    </div>
                </div>
                <div className='right'>
                    {Object.entries(filters).map(([filter, value]) => (
                        <div className='forslider' key={filter}>
                            <span>{filter.replace('_', '-')} : {value}</span>
                            <input name={filter} type="range" min="0" max={filter === 'hue_rotate' ? "360" : "200"} value={value} onChange={handleChange} disabled={!imageLoaded} />
                        </div>
                    ))}
                    <button className='savebtn' onClick={handleSave}>Сохранить</button>
                </div>
            </section>
            {savedImages.length > 0 && (
                <section className='bottom'>
                    {savedImages.map((imageUrl, index) => (
                        <img className='images' key={index} alt='' src={imageUrl}></img>
                    ))}
                </section>
            )}
        </>
    );
}