import React from "react";

const Esse: React.FC = () => {
    return (<div>
         <div className="container">
              <h1>Информация об авторе</h1>
              <p><strong>ФИО:</strong> Орлов Олег Андреевич</p>
              <p><strong>Место рождения:</strong> Ижевск, Россия</p>
              <p><strong>Дата рождения:</strong> 04 Ноября 2004 года</p>
              <p><strong>Место учебы:</strong> Удмуртский государственный университет</p>
              <img src="img/11zon_cropped (1).png" alt="Фотография" />
              <div className="social-links">
                <a href="https://vk.com/heelgior" target="_blank">VK</a>
                <a href="https://t.me/heelgior" target="_blank">Telegram</a>
                <a href="https://github.com/" target="_blank">GitHub</a>
              </div>
            </div>
    </div>);
}

export default Esse;