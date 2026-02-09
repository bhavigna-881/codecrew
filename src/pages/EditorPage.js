import React, { useState,useRef,useEffect } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import {initSocket} from '../socket';

const EditorPage = () => {
  const socketRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.emit('join');
    };
    init();
  }, []);

    const [clients, setClients] = useState([
    { socketId: 1, username: 'Rakesh K' },
    { socketId: 2, username: 'John Doe' },
    { socketId: 3, username: 'Jone Doe' },
  ]);

  return (
    <div className="mainWrap">
      {/* Sidebar */}
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img
              className="logoImage"
              src="/image.png"
              alt="Code Sync Logo"
            />
            <span className="logoText">CodeSync</span>
            <p className="tagline">Realtime collaboration</p>
          </div>

          <h3 className="connectedTitle">Connected</h3>

          <div className="clientList">
            {clients.map(client => (
              <Client
                key={client.socketId}
                username={client.username}
              />
            ))}
          </div>
        </div>

        <div className="asideFooter">
          <button className="btn copyBtn">Copy ROOM ID</button>
          <button className="btn leaveBtn">Leave</button>
        </div>
      </div>

      {/* Editor */}
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
