import app from './';

after(function(done) {
  app.angularFullstack.on('close', () => {
    console.log('closing');
    done();
  });
  app.angularFullstack.close();
});
