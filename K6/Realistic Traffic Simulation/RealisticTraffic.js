import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
  stages: [
    { duration: '2m', target: 50 }, // ramp-up para 50 usuários em 2 minutos
    { duration: '5m', target: 50 }, // mantém 50 usuários por 5 minutos
    { duration: '2m', target: 0 }, // ramp-down para 0 usuários em 2 minutos
  ],
};

export default function () {
  let res = http.get('https://test-api.k6.io/public/crocodiles/');
  check(res, {
    'status code is 200': (r) => r.status === 200,
  });
  sleep(1);
}

export function handleSummary(data) {
  return {
      "result.html": htmlReport(data, { title: "K6 Test Report - Realistic Traffic Simulation" }),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}