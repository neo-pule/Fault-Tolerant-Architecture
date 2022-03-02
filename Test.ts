import { CircutBreaker } from "./CircutBreaker";

const circutBreaker = new CircutBreaker ({

    method : "GET",
    url:"http://localhost:3000/"
});

setTimeout(() => {
    circutBreaker.exe().then(console.log).catch(console.log);
}, 1000);