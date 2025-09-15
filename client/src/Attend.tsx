import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API = 'https://classroom-api-swy0.onrender.com/api/sessions'; 

export default function Attend() {
  const { nonce } = useParams<{ nonce: string }>();
  const [session, setSession] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/${nonce}`)
      .then(({ data }) => setSession(data))
      .catch(() => alert('QR invalide'));
  }, [nonce]);

  const submit = async () => {
    if (!fullName || !studentId) return alert('Nom et numéro requis');
    await axios.post(`${API}/${nonce}/attendance`, {
      fullName,
      studentId,
      email,
    });
    setSent(true);
  };

  if (!session) return <p>Vérification du QR...</p>;
  if (sent) return <p>✅ Présence enregistrée !</p>;

  return (
    <div style={{ padding: 32 }}>
      <h2>
        {session.courseName} – {session.teacher}
      </h2>
      <input
        placeholder="Nom complet"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        placeholder="Numéro étudiant"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <input
        placeholder="Email (optionnel)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={submit}>Valider ma présence</button>
    </div>
  );
}
