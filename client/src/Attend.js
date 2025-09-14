"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Attend;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const API = 'http://localhost:4000/api/session';
function Attend() {
    const { nonce } = (0, react_router_dom_1.useParams)();
    const [session, setSession] = (0, react_1.useState)(null);
    const [fullName, setFullName] = (0, react_1.useState)('');
    const [studentId, setStudentId] = (0, react_1.useState)('');
    const [email, setEmail] = (0, react_1.useState)('');
    const [sent, setSent] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        axios_1.default.get(`${API}/${nonce}`).then(({ data }) => setSession(data)).catch(() => alert('QR invalide'));
    }, [nonce]);
    const submit = async () => {
        if (!fullName || !studentId)
            return alert('Nom et numéro requis');
        await axios_1.default.post(`${API}/attendance`, { sessionId: session.id, fullName, studentId, email });
        setSent(true);
    };
    if (!session)
        return <p>Vérification du QR...</p>;
    if (sent)
        return <p>✅ Présence enregistrée !</p>;
    return (<div style={{ padding: 32 }}>
      <h2>
        {session.courseName} – {session.teacher}
      </h2>
      <input placeholder="Nom complet" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
      <input placeholder="Numéro étudiant" value={studentId} onChange={(e) => setStudentId(e.target.value)}/>
      <input placeholder="Email (optionnel)" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <button onClick={submit}>Valider ma présence</button>
    </div>);
}
