import ProfileIcon from '../../../img/icons/image 18.svg';

export default function SearchMain() {
    return (
        <section className="search-section">
            <div className="container search-container">
                <h1 className="title">Find your teammate</h1>
                {/* Поле пошуку */}
                <div className="search-block">
                    <input type="text" placeholder="🔍Search player..." className="search-input" />
                
                {/* Список гравців */}
                <div className="player-list">
                    {[...Array(5)].map((_, index) => (
                        <div className="player-info-block" key={index}>
                            <div className="player-avatar">
                                <img src={ProfileIcon} alt="User avatar" />
                                <span className={`status-indicator ${getStatus(index)}`}></span>
                            </div>
                            <div className="player-details">
                                <p className="player-name">User name</p>
                                <div className="player-hours-block">
                                    <p>hours: </p>
                                    <p alt="hours">1000h</p>
                                </div>
                                <div className="player-status-block">
                                    <p>status: </p>
                                    <p alt="status">{getStatusText(index)}</p>
                                </div>

                            </div>
                            <button className="chat-button">Chat</button>
                        </div>
                    ))}

                </div>
                </div>

                {/* Кнопка "Show more" */}
                <button className="show-more-button">Show more ↓</button>

            </div>
        </section>
    );
}

// Функція для визначення статусу гравця
function getStatus(index) {
    const statuses = ["online", "sleep", "sleep", "offline", "offline"];
    return statuses[index] || "offline";
}

function getStatusText(index) {
    const statusTexts = ["online", "sleep", "sleep", "offline", "offline"];
    return statusTexts[index] || "offline";
}
