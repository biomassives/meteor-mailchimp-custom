Package.describe({
  name: 'biomassives:mailchimp-custom',
  version: '0.0.4',
  // Brief, one-line summary of the package.
  summary: 'This package extends the Mailchip meteor package by simplifying dialogue and form customizations',
  // URL to the Git repository containing the source code for this package.
  git: 'http://github.com/biomassives/meteor-mailchimp-custom',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse( function ( api, where ) {

	api.versionsFrom('METEOR@0.9.2');
	api.use( ['templating'], 'client' );
	api.addFiles( 'lib/server/mailchimp.js', 'server' );

	api.addFiles([
		'lib/client/views/subscribe/subscribe.html',
		'lib/client/views/subscribe/subscribe.js',
		'lib/client/mailchimp.js'
	], 'client' );

	if ( api.export ) {
		api.export( 'MailChimp', ['server', 'client'] );
	}
});

Npm.depends({ 'mailchimp': '1.1.0' });


Package.onTest(function(api) {
  api.use('tinytest');
  api.use('biomassives:mailchimp-custom');
  api.addFiles('biomassives:mailchimp-custom-tests.js');
});


