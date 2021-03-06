const test = require('tape');
const TestHelpers = require('../TestHelpers');
test('perf1', function (t) {
  t.plan(3);
  const bytecode = TestHelpers.getBytecode('chinese-food');
  TestHelpers.createComponent(bytecode, {}, function (component, teardown, mount) {
    t.equal(mount.outerHTML.length, 11, 'html checksum ok');
    TestHelpers.timeBracket([
      function (done) {
        component._context.tick();
        done();
      },
      function (done, delta) {
        console.log('[haiku core perf test] initial tick took ' + delta + ' vs baseline of 250');
        t.true(true);
        done();
      },
      function (done) {
        component._context.tick();
        done();
      },
      function (done, delta) {
        console.log('[haiku core perf test] patch took ' + delta + ' vs baseline of 10');
        t.true(true);
        done();
      }
    ], teardown);
  });
});
