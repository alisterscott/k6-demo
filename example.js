import http from 'k6/http';

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
};

export default function () {
  http.get('https://my-json-server.typicode.com/webdriverjsdemo/webdriverjsdemo.github.io/posts');
}
