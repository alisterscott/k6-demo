import http from 'k6/http';
import { check } from 'k6';

export const options = {
  discardResponseBodies: true,

  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',
      startRate: 30,
      timeUnit: '1m',
      preAllocatedVUs: 50,

      stages: [
        { target: 30, duration: '30s' },
        { target: 60, duration: '30s' },
        { target: 60, duration: '30s' },
        { target: 30, duration: '30s' },
      ],
    },
  },

  thresholds: {
    checks: ['rate>0.99'], // at least 99% of checks pass
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<5'], // 95% of requests should be below 5ms
  },
};

export default function () {
  const res = http.get('https://my-json-server.typicode.com/webdriverjsdemo/webdriverjsdemo.github.io/posts');
  check(res, { 'status was 200': (r) => r.status == 200 });
}
