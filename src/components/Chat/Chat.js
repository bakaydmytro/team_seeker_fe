import '../Search/Search.css';
import ChatHeader from './ChatHeader.js'
import ChatMain from './ChatMain.js'

function Chat() {
    return (
        <>
            <div className="container">
                <ChatHeader />
                <ChatMain />
            </div>
        </>
    );

}

export default Chat;
