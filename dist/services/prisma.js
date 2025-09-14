"use strict";
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ['query', 'error', 'warn'],
});
module.exports = prisma;
