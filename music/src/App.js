import React, { useEffect, useState } from 'react';

import './App.css';

const fetchSong = async (setData) => {
  try {
    setData({ songs: [], isFetching: true, selectedSong: null });

    const token = window.bootstrap.auth.getToken(); 
    let response = await fetch('https://buildingmfe.maxgallo.io/api/songs', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { ok: isResponseOk } = response;

    response = await response.json();

    if (!isResponseOk) {
      throw new Error(response.data.message);
    }

    const { data: { songs } } = response;

    setData({ songs, isFetching: false, selectedSong: null });
  } catch (e) {
    alert(e);

    setData({ songs: [], isFetching: false, selectedSong: null });
  }
};

function Header({ signoutFn }) {
  return <header class="header">
    <nav>
      <a href="/signout" class="header__link" onClick={signoutFn}>Sign Out</a>
    </nav>
  </header>;
}

function App() {
  const [data, setData] = useState({ songs: [], isFetching: false, selectedSong: null });
  const playerId = 'player'

  useEffect(() => fetchSong(setData), []);
  useEffect(() => {
    const noSongSelected = !data.selectedSong;
    const player = document.getElementById(playerId);

    if (noSongSelected || !player) return;

    player.pause();
    player.play();
  }, [data.selectedSong]);

  const songList = data.songs.map((song) => 
    <li class="song" onClick={() => setData({ ...data, selectedSong: song })}>
      <strong>{song.trackName}</strong> by {song.artistName}
    </li>
  );

  const signout = (event) => {
    event.preventDefault();

    window.bootstrap.auth.setToken('');
    window.bootstrap.router.navigateTo('/hello');
  }

  return (
    <div className="App">
      <Header signoutFn={signout} />

      <p>Click on a song below to play:</p>
      <ul>{songList}</ul>

      {data.selectedSong && (<div>
        Playing:
        <div>“{data.selectedSong.trackName}” – {data.selectedSong.artistName}</div>

        <audio id={playerId} controls src={data.selectedSong.previewUrl}>
          Your browser does not support the <code>audio</code> element.
        </audio>
      </div>)}
    </div>
  );
}

export default App;
