/*
Multiple Queues (M/M/c):

Simulates a system with multiple servers, each with its own queue.
vus and duration are adjusted to simulate a more loaded environment.
*/

import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
  vus: 20, // number of virtual users
  duration: '1m', // test duration
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
  },
};

export default function () {
  let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
  check(res, {
    'status was 200': (r) => r.status == 200,
    'response time was < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(Math.random() * 2); // random wait time between requests
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data, { title: "K6 Test Report - Multiple Queues" }),
    stdout: textSummary(data, { indent: " ", enableColors: true })
  };
}
