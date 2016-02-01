var sleep = require('sleep');
function beep() {
  for (var i = 0; i < 3; i++) {
    process.stdout.write('\x07');
    sleep.sleep(1);
  }
}

beep();
