import React, { useState, useRef, useEffect } from "react";
// @ts-ignore
import logo from "../../assets/logo.svg";
import PlaceService from "../../API/PlaceService";

const Form = () => {
    const [value, setValue] = useState('');
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [isExpanded, setIsExpanded] = useState(false); // Состояние для отображения всех элементов
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [isListOpen, setIsListOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && listRef.current && !listRef.current.contains(event.target as Node) && !inputRef.current.contains(event.target as Node)) {
                setIsListOpen(false); // Закрыть список при клике вне инпута
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

    const handleSelectItem = (selectedItem: any) => {
        setSelectedItems([...selectedItems, selectedItem]);
    };

    const handleRemoveItem = (itemId: string) => {
        setSelectedItems(selectedItems.filter(item => item.id !== itemId));
    };

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <header className="main__header">
                <div className="main__logo">
                    <img src={logo} alt="Логотип сайта"/>
                </div>
                <div>
                    {/* добавить иконку аватарки */}
                </div>
            </header>
            <main className="profile__main">
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
                        {selectedItems.length > 10 && (
                            <button className="profile__expand-btn" onClick={handleToggleExpand}>
                                {isExpanded ? "Свернуть" : "Развернуть"}
                            </button>
                        )}
                    </h3>
                    <div className="profile__list-been-wrapper">
                        <ul className="profile__list-been">
                            {selectedItems.slice(0, isExpanded ? undefined : 10).map((selectedItem, index) => (
                                <li key={selectedItem.id} className="profile__list-item-been">
                                    <p className="profile__city">{selectedItem.city}</p>
                                    <p className="profile__country">{selectedItem.country}</p>
                                    <button className="profile__delete-btn" onClick={() => handleRemoveItem(selectedItem.id)}>
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Form;
