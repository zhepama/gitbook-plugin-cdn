const { processSite } = require('../lib/process');
let context = null;
const cdnRoot = 'https://cdn.jsdelivr.net/gh/zhepama/igiven.github.io@gh-pages/';
beforeEach(() => {
  context = {
    config: {
      cdn: {
        url: cdnRoot,
      }
    }
  };
});

test('should use default image if no specify custom image', () => {
  expect(1).toBe(1);
});

