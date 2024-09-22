import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
  vus: 10, // number of virtual users
  duration: '30s', // test duration
};

export default function () {
  let res = http.get('https://test-api.k6.io/public/crocodiles/');
  check(res, {
    'status é 200': (r) => r.status === 200,
  });
  sleep(1);
}

export function handleSummary(data) {
  return {
      "result.html": htmlReport(data, { title: "K6 Test Report -  Basic" }),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}