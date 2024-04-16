import React, { useState } from 'react';

export default function Images() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [filters, setFilters] = useState({
        blur: 0,
        brightness: 1,
        contrast: 1,
        grayscale: 0,
        hueRotate: 0,
        invert: 0,
        saturate: 1,
        opacity: 1,
        sepia: 0
    });
    const [savedImages, setSavedImages] = useState([]);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result);
            setImageLoaded(true);
        };
        reader.readAsDataURL(file);
    };

    const applyFilters = () => {
        if (selectedImage) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.filter = getFilterString();
                ctx.drawImage(img, 0, 0, img.width, img.height);
                setSelectedImage(canvas.toDataURL());
            };
            img.src = selectedImage;
        }
    };
    const getFilterString = () => {
        let filterString = '';
        for (const key in filters) {
            filterString += `${key}(${filters[key]}) `;
        }
        return filterString.trim();
    };
    const handleSave = () => {
        if (selectedImage) setSavedImages(prevImages => [...prevImages, selectedImage]);
    };
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
        applyFilters(); // Вызываем функцию для применения фильтров
    };

    return (
        <>
            <section className='top'>
                <div className='left'>
                    <img className='image' alt='' style={{ filter: getFilterString() }} src={selectedImage}></img>
                    <div className="file-wrapper">
                        <label htmlFor="file" className="file-button">Выбрать файл</label>
                        <input id="file" type="file" className="file-input" onChange={handleFileChange} />
                    </div>
                </div>
                <div className='right'>
                    {Object.entries(filters).map(([filter, value]) => (
                        <div className='forslider' key={filter}>
                            <span>{filter}: {value}</span>
                            <input name={filter}  type="range" min="0" max={filter === 'hueRotate' ? "360" : "2"} step={filter === 'hueRotate' ? "1" : "0.01"} value={value} onChange={handleFilterChange} disabled={!imageLoaded}/>
                        </div>
                    ))}
                    <button className='savebtn' onClick={handleSave}>Сохранить</button>
                </div>
            </section>
            {savedImages.length > 0 && (
                <section className='bottom'>
                    {savedImages.map((image, index) => (
                        <img className='images' key={index} alt='' src={image}></img>
                    ))}
                </section>
            )}
        </>
    );
}