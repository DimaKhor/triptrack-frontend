import React, { useState, useRef, useEffect } from "react";
import CityImage from "../../services/CityImage";
import PlaceService from "../../services/PlaceService";
import UserService from "../../services/UserService";

interface WillSectionProps {
    userKey: string;
}

const WillSection: React.FC<WillSectionProps> = ({ userKey }) => {
    const [value, setValue] = useState('');
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [isListOpen, setIsListOpen] = useState(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [cityImages, setCityImages] = useState<{ [id: string]: string }>({});
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const email = await UserService.getUserInfo(userKey);
                setUserEmail(email);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, [userKey]);

    useEffect(() => {
        if (userEmail && !isDataLoaded) {
            const savedItems = localStorage.getItem(`selectedWillItems_${userEmail}`);
            const savedImages = localStorage.getItem(`cityWillImages_${userEmail}`);
            if (savedItems) {
                const parsedItems = JSON.parse(savedItems);
                console.log("Загруженные выбранные элементы:", parsedItems);
                setSelectedItems(parsedItems);
            }
            if (savedImages) {
                const parsedImages = JSON.parse(savedImages);
                console.log("Загруженные изображения городов:", parsedImages);
                setCityImages(parsedImages);
            }
            setIsDataLoaded(true);
        }
    }, [userEmail, isDataLoaded]);

    useEffect(() => {
        if (isDataLoaded && userEmail) {
            console.log("Сохранение выбранных элементов:", selectedItems);
            localStorage.setItem(`selectedWillItems_${userEmail}`, JSON.stringify(selectedItems));
            console.log("Сохранение изображений городов:", cityImages);
            localStorage.setItem(`cityWillImages_${userEmail}`, JSON.stringify(cityImages));
        }
    }, [selectedItems, cityImages, isDataLoaded, userEmail]);

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

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            fetchLocations();
        }, 500);
    }, [value, selectedItems]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        setIsListOpen(true);
    };

    const handleSelectItem = async (selectedItem: any) => {
        setSelectedItems([...selectedItems, selectedItem]);
        try {
            const cityImage = await CityImage.GetCityPhoto(selectedItem.city, 'p2FD5wnX2AAGzN64HFAdP7LY_I_Ped0ew0WrIicTrsQ');
            if (cityImage) {
                setCityImages(prevState => ({
                    ...prevState,
                    [selectedItem.id]: cityImage
                }));
            }
        } catch (error) {
            console.error('Ошибка при получении изображения города:', error);
        }
    };

    const handleRemoveItem = (itemId: string) => {
        setSelectedItems(selectedItems.filter(item => item.id !== itemId));
        const { [itemId]: removedImage, ...updatedCityImages } = cityImages;
        setCityImages(updatedCityImages);
        if (userEmail) {
            localStorage.setItem(`selectedWillItems_${userEmail}`, JSON.stringify(selectedItems.filter(item => item.id !== itemId)));
            localStorage.setItem(`cityWillImages_${userEmail}`, JSON.stringify(updatedCityImages));
        }
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
                            <div className="profile__image-container">
                                {cityImages[selectedItem.id] && (
                                    <img src={cityImages[selectedItem.id]} alt={`Изображение ${selectedItem.city}`} className="profile__city_picture_will" />
                                )}
                            </div>
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
