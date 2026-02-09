import React from 'react';
import {v4 as uuidV4} from 'uuid';
import {useState} from 'react';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const[roomId,setRoomId] = useState('');
  const[userName,setUserName]=useState('');
  const handleInputEnter =(e)=>{
    if(e.code==='Enter'){
      joinRoom();
    }
  }
     const createNewRoom =(e)=>{
      e.preventDefault();
      const id=uuidV4();
      setRoomId(id);
      toast.success('Created a new room');
      console.log(id);
    };
    const joinRoom =()=>{
      if(!roomId || !userName){
        toast.error('ROOM ID & username is required');
        return;
      }
      //redirect
      navigate(`/editor/${roomId}`,{
        state:{
          userName,
        },
      });
    };
  return (

    <div className="container">
      <div className="content">
        <img src="/image.png" alt="logo" className="logo"/>
        <h4 className="main-label">ROOM ID</h4>

        <div className="input-group">
          <input
            type="text"
            className="input-box"
            placeholder="Enter Room ID"
            onChange={(e)=>setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />

          <input
            type="text"
            className="username"
            placeholder="Enter Username"
            onChange={(e)=> setUserName(e.target.value)}
            value={userName}
            onKeyUp={handleInputEnter}
          />
          <button className="join-button" onClick={joinRoom}>Join</button>

          <span className="create-info">
            <b>Don't have an invite?</b> then create <a onClick={createNewRoom}href="#" className="create-new">new room</a>
          </span>
        </div>
      </div>

    </div>
  );
};

export default Home;
