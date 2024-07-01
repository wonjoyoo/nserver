import {server} from "./app";

process.env.TZ = "+09:00"; // 이 코드를 추가합니다.

const host = process.env.NODE_ENV === "production" ? "api.nserver.co.kr" : "localhost";
const port = process.env.APP_PORT || 8000;


server.listen(port, () =>
  console.log(`NServer is listening at http://${host}:${port}`)
);
