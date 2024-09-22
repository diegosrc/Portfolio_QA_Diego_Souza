import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
  vus: 10, // number of virtual users
  duration: '1m', // test duration
  thresholds: {
    http_req_duration: ['p(95)<300'], // 95% of requests should be below 300ms
  },
};

function erlang(k, lambda) {
  let product = 1.0;
  for (let i = 0; i < k; i++) {
    product *= Math.random();
  }
  return -Math.log(product) / lambda;
}

export default function () {
  let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
  check(res, {
    'status was 200': (r) => r.status == 200,
    'response time was < 300ms': (r) => r.timings.duration < 300,
  });
  sleep(erlang(2, 1)); // wait time following an Erlang distribution
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data, { title: "K6 Test Report - Erlang Model" }),
    stdout: textSummary(data, { indent: " ", enableColors: true })
  };
}