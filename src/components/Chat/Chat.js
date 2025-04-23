import '../Search/Search.css';
import ChatHeader from './ChatHeader.js'
import ChatMain from './ChatMain.js'
import './ChatMain.css';

function Chat() {
    return (
        <>
            <div className="container container_chat">
                <ChatHeader />
                <ChatMain />
            </div>
        </>
    );

}

export default Chat;
