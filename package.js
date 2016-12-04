Package.describe({
  name: 'clinical:csv',
  version: '0.2.0',
  summary: 'Utilities for importing and exporting comma separated value (CSV) files.',
  git: 'https://github.com/clinical-meteor/csv',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use('evaisse:csv@0.1.4');

  api.addFiles('client/filesaver.js', 'client');
  api.addFiles('csv.js');

  api.imply('evaisse:csv@0.1.4');

  api.export('CSV');
  api.export('saveAs');
});
