"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CircutBreaker_1 = require("./CircutBreaker");
const circutBreaker = new CircutBreaker_1.CircutBreaker({
    method: "GET",
    url: "http://localhost:3000/"
});
setTimeout(() => {
    circutBreaker.exe().then(console.log).catch(console.log);
}, 1000);
//# sourceMappingURL=Test.js.map