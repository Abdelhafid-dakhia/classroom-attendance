import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import './App.css';

const API = 'https://classroom-api-swy0.onrender.com/api/session';

function App() {
  const [nonce, setNonce] = useState<string>('');
  const [course, setCourse] = useState('');
  const [teacher, setTeacher] = useState('');
  const [url, setUrl] = useState('');

  // Créer une session
  const createSession = async () => {
    if (!course || !teacher) return alert('Remplir tous les champs');
    const { data } = await axios.post(API, { courseName: course, teacher });
    setNonce(data.nonce);
    const u = `${window.location.origin}/a/${data.nonce}`;
    setUrl(u);
  };

  return (
    <div className="App">
      <h1>Gestion d’appel – QR Code</h1>

      {!nonce ? (
        <section>
          <h2>Nouvelle séance</h2>
          <input placeholder="Matière" value={course} onChange={(e) => setCourse(e.target.value)} />
          <input placeholder="Enseignant" value={teacher} onChange={(e) => setTeacher(e.target.value)} />
          <button onClick={createSession}>Générer le QR</button>
        </section>
      ) : (
        <section>
          <h2>QR Code à projeter</h2>
          <QRCodeCanvas value={url} size={256} />
          <p>
            <a href={url} target="_blank" rel="noreferrer">
              {url}
            </a>
          </p>
        </section>
      )}
    </div>
  );
}

export default App;