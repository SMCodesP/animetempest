import axios from "axios";
import randomAgent from "./randomAgent";

let authData: {
  "X-Auth": string;
  "X-Requested-With": string;
} | null = null;

export function getStreamingDataR() {
  const r = Math.floor(Math.random() * 90000) + 10000;
  const time = (Date.now() / 1000) * 2;
  const token = Math.round(time * r);

  console.log(r)
  console.log(token)

  return {
    'r': r,
    'token': token,
  };
}

export async function getAuth(): Promise<{}> {
  if (authData) return authData;

  const buffer = Buffer.from("WgNAV0BITUBDTUQDG1VTVEQNA1FNQFVHTlNMAxsDYE9FU05IRQMNA1dEU1JITk8DGwMQEQMNA1RUSEUDGwNCRRITExVEREJHE0cQQEVDAw0DQk5TRU5XQAMbAxgPEQ8RAw0DTE5FRE0DGwNgT0VTTkhFAXJlagFDVEhNVQFHTlMBWRkXAw0DTEBPVEdAQlVUU0RTAxsDZk5ORk1EAw0DSFJ3SFNVVEBNAxtVU1REDQNSRFNIQE0DGwNUT0pPTlZPAw0DVFJEU0hFAxsDGUBFFRlHF0cMEEcTGAwVFxEYDBlCGRAMEUdEF0VDR0VDExQRA1w=", 'base64').toString()

  const response = await axios.post('https://auth.appanimeplus.tk', buffer, {
    headers: {
      'Host': 'auth.appanimeplus.tk',
      'user-agent': randomAgent(),
      'content-type': 'application/octet-stream',
      'accept': '*/*',
      'proxy-type': 'brazil',
      'content-length': buffer.length,
    },
    proxy: {
      protocol: String(process.env.PROXY_PROTOCOL),
      host: String(process.env.PROXY_HOST),
      port: Number(process.env.PROXY_PORT),
      auth: {
        username: String(process.env.PROXY_USERNAME),
        password: String(process.env.PROXY_PASSWORD)
      }
    },
  })

  return {
    "X-Auth": response.data,
    "X-Requested-With": "br.com.meuanimetv",
  }
}
