import React, { useState } from 'react';

export default function Photos() {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [filters, setFilters] = useState({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0
    });

    // Обновление фильтров на изображении в реальном времени
    const applyFilters = () => {
        if (!image) return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) blur(${filters.blur}px)`;
            ctx.drawImage(img, 0, 0);
            setImage(canvas.toDataURL());
        };
        img.src = image;
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
        applyFilters(); // Применение фильтров при изменении
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь можно добавить логику для сохранения данных о фотографии
        // Например, отправка на сервер или сохранение в локальном хранилище
        // После сохранения переход к галерее фото
        // Для простоты примера, просто обновим мини-галерею в консоли
        console.log({ image, description, tags, filters });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Выберите изображение:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <div>
                    {image && <img src={image} alt="Uploaded" style={{ maxWidth: '100%', marginBottom: '10px' }} />}
                </div>
                <div>
                    <label>Описание:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Теги:</label>
                    <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
                {/* Добавление элементов управления для фильтров */}
                <div>
                    <label>Brightness:</label>
                    <input type="range" name="brightness" value={filters.brightness} onChange={handleFilterChange} />
                </div>
                <div>
                    <label>Contrast:</label>
                    <input type="range" name="contrast" value={filters.contrast} onChange={handleFilterChange} />
                </div>
                <div>
                    <label>Saturation:</label>
                    <input type="range" name="saturation" value={filters.saturation} onChange={handleFilterChange} />
                </div>
                <div>
                    <label>Blur:</label>
                    <input type="range" name="blur" value={filters.blur} onChange={handleFilterChange} />
                </div>
                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
}