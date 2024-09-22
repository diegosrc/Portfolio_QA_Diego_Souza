import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  let res = http.get('https://jsonplaceholder.typicode.com/posts');
  check(res, {
    'status code is 200': (r) => r.status === 200,
    'response time is less than 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}

export function handleSummary(data) {
  return {
      "result.html": htmlReport(data, { title: "K6 Test Report - Performance Test" }),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
