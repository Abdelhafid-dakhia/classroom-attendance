"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/', (req, res) => {
    // your logic here
    res.json({ message: 'Session created', data: req.body });
});
exports.default = router;
