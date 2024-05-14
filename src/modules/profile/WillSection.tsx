import React, { useState, useRef, useEffect } from "react";
import CityImage from "../../API/CityImage";
import PlaceService from "../../API/PlaceService";

const WillSection = () => {
    const [value, setValue] = useState('');
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [isListOpen, setIsListOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && listRef.current && !listRef.current.contains(event.target as Node) && !inputRef.current.contains(event.target as Node)) {
                setIsListOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        async function fetchLocations() {
            if (value !== '') {
                setLoading(true);
                try {
                    const response = await PlaceService.GetListLocations(value, 5);
                    const locations: { id: string; city: string; country: string; }[] = response.data.map((item: any) => {
                        const parts = item.display_name.split(', ');
                        return {
                            id: item.place_id,
                            city: parts[0],
                            country: parts[parts.length - 1]
                        };
                    });
                    setItems(locations.filter(item => !selectedItems.some(selectedItem => selectedItem.id === item.id)));
                    setLoading(false);
                } catch (error) {
                    console.error('Ошибка при получении данных:', error);
                    setLoading(false);
                }
            } else {
                setItems([]);
            }
        }

        fetchLocations();
    }, [value, selectedItems]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        setIsListOpen(true);
    };

    const handleSelectItem = async (selectedItem: any) => {
        setSelectedItems([...selectedItems, selectedItem]);
        try {
            const cityImage = await CityImage.GetCityPhoto(selectedItem.city, 'p2FD5wnX2AAGzN64HFAdP7LY_I_Ped0ew0WrIicTrsQ');
            console.log(cityImage);
            if (cityImage) {
                const imageElement = document.createElement('img');
                imageElement.src = cityImage;
                imageElement.alt = `Изображение ${selectedItem.city}`;
                imageElement.classList.add('profile__city_picture_will');
                const listItem = document.querySelector(`.profile__list-item-will[data-id="${selectedItem.id}"]`);
                if (listItem) {
                    const imageContainer = listItem.querySelector('.profile__image-container');
                    if (imageContainer) {
                        imageContainer.appendChild(imageElement);
                    }
                }
            }
        } catch (error) {
            console.error('Ошибка при получении изображения города:', error);
        }
    };

    const handleRemoveItem = (itemId: string) => {
        setSelectedItems(selectedItems.filter(item => item.id !== itemId));
    };

    return (
        <section className="will">
            <label className="profile__title">
                Запланируй поездку!
                <input
                    className="profile__input-been"
                    placeholder="Поиск места"
                    type="text"
                    value={value}
                    onChange={handleChange}
                    ref={inputRef}
                    onClick={() => setIsListOpen(true)}
                />
            </label>
            {value !== '' && !loading && isListOpen && (
                <div>
                    <ul className="profile__search-list" ref={listRef}>
                        {items.map((item, index) => (
                            <li key={item.id} className="profile__search-list-item" onClick={() => handleSelectItem(item)}>
                                <div>
                                    <h5>{item.city}, {item.country}</h5>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <h3 className="profile__title_been">
                Предстоящие путешествия
            </h3>
            {selectedItems.length === 0 && (
                <h4 className="been__title-no-places">
                    Пока нет предстоящих путешествий.
                </h4>
            )}
            <ul className="profile__list-will">
                {selectedItems.map((selectedItem, index) => (
                    <li key={selectedItem.id} className="profile__list-item-will" data-id={selectedItem.id}>
                        <div className="will_info">
                            <div className="profile__image-container"></div>
                            <p className="profile__city_will">{selectedItem.city}</p>
                        </div>
                        <button className="profile__delete-btn-will" onClick={() => handleRemoveItem(selectedItem.id)}>
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default WillSection;
