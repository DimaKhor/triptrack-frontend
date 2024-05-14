import React, {useEffect, useState} from "react";
// @ts-ignore
import {observer} from "mobx-react";
// @ts-ignore
import logo from "../../assets/logo.svg"
// @ts-ignore
import card1 from "../../assets/card1.png"
// @ts-ignore
import card2 from "../../assets/card3.png"
// @ts-ignore
import card3 from "../../assets/card2.png"
// @ts-ignore
import card3_soon from "../../assets/card3-soon.png"
// @ts-ignore
import card4 from "../../assets/card4.png"
// @ts-ignore
import card4_soon from "../../assets/card4-soon.png"



const Form = observer(() => {

    return (
        <body>
            <header className="main__header">
                <div className="main__logo">
                    <img src={logo} alt="Логотип сайта"/>
                </div>
                <nav>
                    <ul className="main__links-list">
                        <li>
                            <a href="../login">
                                <button className="main__link blue_button">Войти</button>
                            </a>
                        </li>
                        <li>
                            <a href="../register">
                                <button className="main__link grey_button">Создать аккаунт</button>
                            </a>
                        </li>
                    </ul>

                </nav>
            </header>
            <main className="main__main">
                <section className="main__cover">
                    <div className="overlay"></div>
                    <h1 className="main__cover__title">Путешествуй. Доберись вместе с Triptrack.</h1>
                </section>
                <section className="main__about">
                    <h2 className="main__about__title">Запланируй поездку вместе с TripTrack</h2>
                    <ul className="main__about__cards">
                        <li>
                            <div>
                                <img src={card1} className="main__card-img"/>
                                <h4 className="main__card-title">Храни список поездок</h4>
                                <p className="main__card-text">Add multiple stops, edit your route, and get turn-by-turn
                                    directions.</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src={card2} className="main__card-img"/>
                                <h4 className="main__card-title">Планируй поездки</h4>
                                <p className="main__card-text">Book a flight, ride, or rental car for your trip.</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src={card3_soon} className="main__card-img"/>
                                <h4 className="main__card-title">Поделись воспоминаниями</h4>
                                <p className="main__card-text">Find and book a hotel, vacation rental, or other
                                    accommodations.</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <img src={card4_soon} className="main__card-img"/>
                                <h4 className="main__card-title">Построй маршрут</h4>
                                <p className="main__card-text">Get directions and show routes on a map.</p>
                            </div>
                        </li>
                    </ul>
                </section>
            </main>
        </body>
    );
});
export default Form;
