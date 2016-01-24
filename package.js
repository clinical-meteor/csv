Package.describe({
  name: 'clinical:csv',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Utilities for importing and exporting comma separated value (CSV) files.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/clinical-meteor/csv',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use('evaisse:csv@0.1.4');

  api.addFiles('client/filesaver.js', 'client');
  api.addFiles('csv.js');

  api.imply('evaisse:csv');
  api.export('CSV');
  api.export('saveAs');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('clinical:csv');
  api.addFiles('csv-tests.js');
});
