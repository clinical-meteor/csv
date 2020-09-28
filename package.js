Package.describe({
  name: 'clinical:csv',
  version: '0.3.0',
  summary: 'Utilities for importing and exporting comma separated value (CSV) files.',
  git: 'https://github.com/clinical-meteor/csv',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('ecmascript@0.13.0');
  
  // client
  api.addFiles('client/exportFile.js', 'client');
  api.addFiles('client/saveAs.js', 'client');

  // server files
  api.addFiles('server/readCsvFileLineByLine.js', 'server');

  api.export('CSV');

  api.export('readCsvFileLineByLine')
  api.export('saveAs');

  // Don't know if we need this.  
});


Npm.depends({
  "byline":"4.2.1",
  "papaparse": "5.2.0"
});
