/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { TopBar } from '../components';

import { initializeApp } from 'firebase/app';
import { getDatabase, get, ref } from 'firebase/database';

const background = css`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const container = css`
  width: 65%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 100px;

  @media (max-width: 768px) {
    width: 80%;
  }

  & p:first-of-type {
    color: #eee;
    font-family: 'S-CoreDream-5Medium';
    font-size: calc(1vw + 13px);
  }
  & p:last-of-type {
    font-family: 'S-CoreDream-4Regular';
    font-size: calc(0.5vw + 12px);
  }
`;
const participate = css`
  width: calc(400px + 82.4px);
  display: flex;
  font-size: calc(0.5vw + 12px);

  @media (max-width: 768px) {
    width: 400px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;
const input = css`
  width: 400px;
  height: 50px;
  padding: 15px 25px;
  border: none;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  color: black;
  background-color: whitesmoke;
  font-size: calc(0.5vw + 12px);
  font-family: 'S-CoreDream-5Medium';

  :focus {
    outline: none;
  }
  ::placeholder {
    color: black;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;
const button = css`
  height: 50px;
  padding: 0px 20px;
  border: solid 2px whitesmoke;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  cursor: pointer;
  background-color: black;
  font-size: calc(0.5vw + 12px);
  font-family: 'S-CoreDream-5Medium';

  :hover {
    background-color: #0071e3;
  }
`;
const menu = css`
  width: calc(400px + 82.4px);
  height: 50px;
  margin-top: 75px;
  margin-bottom: 20px;
  padding: 0px 25px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  background-color: #0071e3;
  font-size: calc(0.5vw + 12px);
  font-family: 'S-CoreDream-5Medium';
  text-align: left;

  :hover {
    background-color: #0058b0;
  }

  @media (max-width: 768px) {
    width: 400px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

function Home() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const roomList = ref(database, 'rooms');

  const [isValid, setValid] = useState(true);

  const createRoom = () => {
    window.location.href = 'https://moayoung-b2596.web.app/';
  };
  const onChange = () => {
    setValid(true);
  };
  const enterRoom = () => {
    const roomName = document.getElementById('roomName').value;
    const link = 'https://moayoung-b2596.web.app/#' + roomName;

    if (roomName) {
      get(roomList)
        .then((snapshot) => {
          if (snapshot.exists() && roomName in snapshot.val()) {
            window.location.href = link;
          } else {
            alert('존재하지 않는 통화방입니다.');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('입장할 통화방의 이름을 입력하세요.');
      setValid(false);
    }
  };

  return (
    <div css={background}>
      <TopBar />
      <div css={container}>
        <p>모두를 아우르는 영상 통화 서비스</p>
        <p>
          <br />
          누구에게나 편리한 화상 통화를
          <br />
          언제 어디서든 무료로 이용할 수 있습니다.
        </p>
        <button css={menu} onClick={createRoom}>
          + 새 통화방 생성
        </button>
        <div css={participate}>
          <input
            type="text"
            id="roomName"
            css={input}
            style={{ backgroundColor: isValid ? 'whitesmoke' : 'pink' }}
            placeholder="통화방 이름 입력"
            onChange={onChange}
            autoFocus
            required
          />
          <input type="submit" value="입장" css={button} onClick={enterRoom} />
        </div>
      </div>
    </div>
  );
}

export default Home;
