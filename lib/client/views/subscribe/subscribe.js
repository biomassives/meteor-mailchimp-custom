var subscribeMessage			= 'Join the the mailing list:',
	subscribeInvalidEmail		= 'Invalid email address :(',
	subscribeSubscribing		= 'You are being Subscribed...',
	subscribeSuccess			= 'Thank you, please check your email to confirm your email.',
	subscribeAlreadySubscribed	= 'You are already subscribed!',

	subscribeTitle,
	subscribeEmail,
	subscribeButton,

	subscribeComment,
	subscribeFname,
	subscribeLname,
	subscribeInterest,
	subscribeBirthdayDay,
        subscribeBirthdayMonth,
	subscribeAddress,
	subscribeAddress1,
	subscribeAddress2,
	subscribeAddrCity,
	subscribeAddrState,
	subscribeAddrZip,
	subscribeAddrCountry,
	subscribeWebsite,

	showMessage = function ( message ) {
		if ( subscribeTitle ) {
			subscribeTitle.innerHTML = message;
		}
	},

	isValidEmailAddress = function ( emailAddress ) {
		// http://stackoverflow.com/a/46181/11236
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return re.test( emailAddress );
	},

	validateEmailAddress = function ( updateMessage ) {
		if ( subscribeEmail.value !== '' && isValidEmailAddress( subscribeEmail.value ) ) {
			subscribeButton.disabled = false;

			if ( updateMessage ) {
				showMessage( subscribeMessage );
			}
		} else {
			subscribeButton.disabled = true;

			if ( subscribeEmail.value !== '' ) {
				showMessage( subscribeInvalidEmail );
			} else if ( updateMessage ) {
				showMessage( subscribeMessage );
			}
		}
	},

	mailChimpListSubscribe = function (email, fname, lname, birthday, address, website, comment, interest, list_id ) {
		var mailChimp = new MailChimp(/* apiKey, options */);

		mailChimp.call( 'lists', 'subscribe',
			{
				id   : list_id,		// null -> defined @ server
				email: {
					email: email
				},
                                merge_vars: {
                                        mc_location: {
                                          latitude: "example latitude",
                                          longitude: "example longitude"
                                        },
                                        fname: fname,
                                        lname: lname,
                                        birthday: birthday,
					address: "address",
					website: website,
					interest: interest,
                                        mc_language: "lang",
                                        mc_notes: [ {
                                          note: comment,
                                          action: "submitted from website"
                                          } ]
                                },
                                send_welcome: true,
                                dropdown: {
                                        interest: interest
                                }
			},

			function ( error, result ) {
				if ( error ) {
					switch ( error.error ) {
						case 232:	// 'Email_NotExists'
							showMessage( subscribeInvalidEmail );
							break;
						case 214:	// 'List_AlreadySubscribed'
							showMessage( subscribeAlreadySubscribed );
							break;
						case 200:	// 'List_DoesNotExist'
							// We shouldn't be here!
							// continue to default...
						default:
							showMessage( 'Error: ' + error.reason );
					}

					console.error( '[MailChimp][Subscribe] Error: %o', error );

				} else {

					console.info( '[MailChimp][Subscribe] Greetings, ' + subscribeEmail.value + ', ' + subscribeSuccess );
					console.info( '[MailChimp][Subscribe] Subscriber: %o', result );

					showMessage( subscribeSuccess );
				}

				subscribeEmail.disabled = false;
				validateEmailAddress( false );
			}
		);
	},

	subscribeGo = function ( eventBubbling ) {
		subscribeEmail.disabled  = true;
		subscribeButton.disabled = true;

		showMessage( subscribeSubscribing );

//                subscribeAddress.value = subscribeAddress1.value + subscribeAddress2.value + subscribeAddrCity.value + subscribeAddrState.value + subscribeAddrZip.value + subscribeAddrCountry.value;                
//                subscribeAddress = subscribeAddress1 + subscribeAddress2 + subscribeAddrCity + subscribeAddrState + subscribeAddrZip + subscribeAddrCountry;                
//		subscribeAddress.value= "addy543";

		mailChimpListSubscribe( subscribeEmail.value, subscribeFname.value, subscribeLname.value, subscribeBirthdayDay.value, subscribeAddress1.value, subscribeWebsite.value, subscribeComment.value, subscribeInterest.value);

		// Prevent Event Bubbling
		return eventBubbling;
	};

Template.MailChimpListSubscribe.rendered = function () {
	subscribeTitle  = this.find( '.message' );
	subscribeComment  = this.find( '.comment' );
	subscribeEmail  = this.find( '.email' );
	subscribeFname  = this.find( '.fname' );
	subscribeLname  = this.find( '.lname' );
	subscribeBirthday = this.find( '.birthday' );
	subscribeAddress1 = this.find( '.addr1');
        subscribeAddress2 = this.find( '.addr2');
        subscribeAddrCity = this.find( '.city');
        subscribeAddrState = this.find( '.state');
        subscribeAddrZip = this.find( '.zip');
        subscribeAddrCountry = this.find( '.country');
        subscribeBirthdayDay  = this.find( '.birthdayDay' );
	subscribeBirthdayMonth  = this.find( '.birthdayMonth' );
	subscribeWebsite  = this.find( '.url' );
	subscribeInterest  = this.find( '.interest' );
	subscribeButton = this.find( '.subscribe' );
	subscribeButton.disabled = ( subscribeEmail.value === '' );



 console.info('email' + subscribeEmail);
 console.info('fname' + subscribeFname);
 console.info('lname' + subscribeLname);
 console.info('interest' + subscribeInterest.value);


};

Template.MailChimpListSubscribe.helpers({
	message: function() {
		subscribeMessage = this.title || subscribeMessage;
		return subscribeMessage;
	}
});

Template.MailChimpListSubscribe.events({
	'focus .email, paste .email, cut .email': function ( e ) {
		setTimeout( function ( e ) {
			validateEmailAddress( true );
		}, 0 );
	},

	'keyup .email': function ( e ) {
		var key = e.which || e.keyCode || e.charCode;

		if (
			key === 8 ||				// [Backspace]
			key === 46					// [Delete]
		) {
			setTimeout( function () {
				validateEmailAddress( true );
			}, 0 );
		}
	},

	'keypress .email': function ( e ) {
		var key = e.which || e.keyCode || e.charCode;

		setTimeout( function () {
			validateEmailAddress( true );
			if ( isValidEmailAddress( subscribeEmail.value  ) ) {
				if ( key === 13	) {		// [Return]
					subscribeGo( true );
				}
			}
		}, 0 );
	},

	'click .subscribe': function ( e ) {
		validateEmailAddress( true );
		if ( isValidEmailAddress( subscribeEmail.value  ) ) {
			subscribeGo( false );
		}
	}
});
