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
  const htmlContent = `<img src="data:image/png" />`;
  const actual = processSite.bind(context)(htmlContent);
  expect(actual).toBe(htmlContent);
});

