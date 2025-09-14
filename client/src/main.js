"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const react_router_dom_1 = require("react-router-dom");
const App_1 = __importDefault(require("./App"));
const Attend_1 = __importDefault(require("./Attend"));
require("./index.css");
const router = (0, react_router_dom_1.createBrowserRouter)([
    { path: '/', element: <App_1.default /> },
    { path: '/a/:nonce', element: <Attend_1.default /> },
]);
client_1.default.createRoot(document.getElementById('root')).render(<react_1.default.StrictMode>
    <react_router_dom_1.RouterProvider router={router}/>
  </react_1.default.StrictMode>);
