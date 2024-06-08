import React, { useState, useRef, useEffect } from "react";
import CityImage from "../../services/CityImage";
import PlaceService from "../../services/PlaceService";
import UserService from "../../services/UserService";

interface BeenSectionProps {
    userKey: string;
}

const BeenSection: React.FC<BeenSectionProps> = ({ userKey }) => {
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
    const [isExpanded, setIsExpanded] = useState(false);

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
            const savedItems = localStorage.getItem(`selectedBeenItems_${userEmail}`);
            const savedImages = localStorage.getItem(`cityBeenImages_${userEmail}`);
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
            localStorage.setItem(`selectedBeenItems_${userEmail}`, JSON.stringify(selectedItems));
            console.log("Сохранение изображений городов:", cityImages);
            localStorage.setItem(`cityBeenImages_${userEmail}`, JSON.stringify(cityImages));
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
        const updatedSelectedItems = selectedItems.filter(item => item.id !== itemId);
        const { [itemId]: removedImage, ...updatedCityImages } = cityImages;
        setSelectedItems(updatedSelectedItems);
        setCityImages(updatedCityImages);
        if (userEmail) {
            localStorage.setItem(`selectedBeenItems_${userEmail}`, JSON.stringify(updatedSelectedItems));
            localStorage.setItem(`cityBeenImages_${userEmail}`, JSON.stringify(updatedCityImages));
        }
    };

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <section className="been">
            <label className="profile__title">
                Где ты уже был?
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
                Твои места
                {selectedItems.length > 5 && (
                    <button className="profile__expand-btn" onClick={handleToggleExpand}>
                        {isExpanded ? "Свернуть" : "Развернуть"}
                    </button>
                )}
            </h3>
            <ul className="profile__list-been">
                {selectedItems.slice(0, isExpanded ? undefined : 5).map((selectedItem, index) => (
                    <li key={selectedItem.id} className="profile__list-item-been" data-id={selectedItem.id}>
                        <div className="profile__image-container">
                            {cityImages[selectedItem.id] && (
                                <img src={cityImages[selectedItem.id]} alt={`Изображение ${selectedItem.city}`} className="profile__city_picture" />
                            )}
                        </div>
                        <p className="profile__city">{selectedItem.city}</p>
                        <p className="profile__country">{selectedItem.country}</p>
                        <button className="profile__delete-btn" onClick={() => handleRemoveItem(selectedItem.id)}>
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
            {selectedItems.length === 0 && (
                <h4 className="been__title-no-places">
                    Пока нет добавленных мест.
                </h4>
            )}
        </section>
    );
};

export default BeenSection;
