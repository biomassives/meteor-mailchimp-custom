Package.describe({
  name: 'biomassives:mailchimp-custom',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'This package extends the Mailchip meteor package by simplifying dialogue and form customizations',
  // URL to the Git repository containing the source code for this package.
  git: 'http://githiub.com/biomassives/meteor-mailchimp-custom',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2');
  api.addFiles('biomassives:mailchimp-custom.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('biomassives:mailchimp-custom');
  api.addFiles('biomassives:mailchimp-custom-tests.js');
});
