import React, { useState, useRef, useEffect } from "react";
// @ts-ignore
import logo from "../../assets/logo.svg";
import PlaceService from "../../API/PlaceService";

const Form = () => {
    const [value, setValue] = useState('');
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);
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

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue);
        if (inputValue !== '') {
            setLoading(true);
            try {
                const response = await PlaceService.GetListLocations(inputValue, 5);
                const locations = response.data.map((item: any) => {
                    const parts = item.display_name.split(', ');
                    return {
                        id: item.place_id, // Добавляем id для каждого места
                        city: parts[0],
                        country: parts[parts.length - 1]
                    };
                });
                setItems(locations);
                setLoading(false);
                setIsListOpen(true); // Открыть список при вводе текста
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
                setLoading(false);
            }
        } else {
            setItems([]);
            setIsListOpen(false); // Закрыть список при очистке поля ввода
        }
    };

    const handleSelectItem = (selectedItem: any) => {
        setSelectedItems([...selectedItems, selectedItem]);
        setIsListOpen(false); // Закрыть список
    };

    const handleDeleteItem = (itemId: string) => {
        setSelectedItems(selectedItems.filter(item => item.id !== itemId)); // Удаляем элемент по его id
    };

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded); // Изменить состояние развернутости списка
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
                            onClick={() => setIsListOpen(true)} // Открывать список при клике на инпут
                        />
                    </label>
                    {/* Отображение списка городов и стран */}
                    {value !== '' && !loading && isListOpen && (
                        <div>
                            <ul className="profile__search-list" ref={listRef}>
                                {items.map((item, index) => (
                                    <li key={item.id} className="profile__search-list-item" onClick={() => handleSelectItem(item)}>
                                        <div className="">
                                            <h5 className="">{item.city}, {item.country}</h5>
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
                            {/* Ограничение вывода элементов списка */}
                            {selectedItems.slice(0, isExpanded ? undefined : 10).map((selectedItem, index) => (
                                <li key={selectedItem.id} className="profile__list-item-been">
                                    <p className="profile__city">{selectedItem.city}</p>
                                    <p className="profile__country">{selectedItem.country}</p>
                                    {/* Крестик для удаления элемента */}
                                    <button className="profile__delete-btn" onClick={() => handleDeleteItem(selectedItem.id)}>
                                        &times;
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
