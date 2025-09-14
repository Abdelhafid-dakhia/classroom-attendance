"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const qrcode_react_1 = require("qrcode.react");
const axios_1 = __importDefault(require("axios"));
require("./App.css");
const API = 'https://classroom-api-swy0.onrender.com/api/session';
function App() {
    const [nonce, setNonce] = (0, react_1.useState)('');
    const [course, setCourse] = (0, react_1.useState)('');
    const [teacher, setTeacher] = (0, react_1.useState)('');
    const [url, setUrl] = (0, react_1.useState)('');
    // Créer une session
    const createSession = async () => {
        if (!course || !teacher)
            return alert('Remplir tous les champs');
        const { data } = await axios_1.default.post(API, { courseName: course, teacher });
        setNonce(data.nonce);
        const u = `${window.location.origin}/a/${data.nonce}`;
        setUrl(u);
    };
    return (<div className="App">
      <h1>Gestion d’appel – QR Code</h1>

      {!nonce ? (<section>
          <h2>Nouvelle séance</h2>
          <input placeholder="Matière" value={course} onChange={(e) => setCourse(e.target.value)}/>
          <input placeholder="Enseignant" value={teacher} onChange={(e) => setTeacher(e.target.value)}/>
          <button onClick={createSession}>Générer le QR</button>
        </section>) : (<section>
          <h2>QR Code à projeter</h2>
          <qrcode_react_1.QRCodeCanvas value={url} size={256}/>
          <p>
            <a href={url} target="_blank" rel="noreferrer">
              {url}
            </a>
          </p>
        </section>)}
    </div>);
}
exports.default = App;
