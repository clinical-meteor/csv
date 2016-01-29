describe('clinical:env', function () {
  it.server('is in development mode by default', function () {
    expect(Env.isProduction).to.be.false;
    expect(Env.isDevelopment).to.be.true;
    expect(Env.isTesting).to.be.false;
    expect(Env.isTraining).to.be.false;
    expect(Env.isStaging).to.be.false;
  });
  it.client('hides process.env.FOO on client by default', function () {
    expect(process.env.FOO).to.be.undefined;
  });

  // THE FOLLOW SHOULD BE GOOD
  // describe('Env.allow()', function () {
  //   if (Meteor.isServer) {
  //     Env.allow({
  //       METEOR_ENV: true
  //     });
  //   };
  //   it.client('exposes specified environment variable on client', function () {
  //     expect(process.env.METEOR_ENV).to.equal("development");
  //   });
  // });
  //
  // describe('development environment', function () {
  //   if (Meteor.isServer) {
  //     Env.allow({
  //       METEOR_ENV: true
  //     });
  //   };
  //
  //   it.client('process.env.METEOR_ENV is "development" on client', function () {
  //     expect(process.env.METEOR_ENV).to.equal("development");
  //   });
  //   it.client('Env.isDevelopment is true', function () {
  //     expect(Env.isDevelopment).to.be.true;
  //   });
  //   it.client('Other environment helpers are false', function () {
  //     expect(Env.isProduction).to.be.false;
  //     expect(Env.isTesting).to.be.false;
  //     expect(Env.isTraining).to.be.false;
  //     expect(Env.isStaging).to.be.false;
  //   });
  //
  // });

});
