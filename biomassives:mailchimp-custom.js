// Biomassives Group MIT licensed Meteor Package
// http://github.com/biomassives/meteor-mailchimp-custom

Package.describe({
        name    : 'biomassives:meteor-mailchimp-custom',
        version : '1.0.4',
        summary : 'A Meteor wrapper for MilChimp API with form customization',
        author  : " (http://biomassiv.es)",
        git     : 'https://github.com/biomassives/meteor-mailchimp-custom.git'
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

