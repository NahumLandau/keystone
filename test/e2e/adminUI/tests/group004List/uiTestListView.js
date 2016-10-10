var ModelTestConfig = require('../../../modelTestConfig/UserModelTestConfig');

module.exports = {
	before: function (browser) {
		browser.adminUIApp = browser.page.adminUIApp();
		browser.adminUISigninScreen = browser.page.adminUISignin();
		browser.adminUIListScreen = browser.page.adminUIListScreen();
		browser.adminUIItemScreen = browser.page.adminUIItemScreen();
		browser.adminUIInitialFormScreen = browser.page.adminUIInitialForm();
		browser.adminUIDeleteConfirmation = browser.page.adminUIDeleteConfirmation();
		browser.adminUIListScreen.setDefaultModelTestConfig(ModelTestConfig);

		browser.adminUIApp.gotoSigninScreen();
		browser.adminUISigninScreen.signin();

		browser.adminUIApp.openList({section: 'access', list: 'users'}).waitForListScreen();
	},
	after: function (browser) {
		browser.adminUIApp.signout();
		browser.end();
	},
	'List screen must show a search bar': function (browser) {
		browser.adminUIListScreen.assertElementIsVisible('searchInputField');
	},
	'List screen must show a search field clear icon': function (browser) {
		browser.adminUIListScreen.assertElementIsVisible('searchInputFieldClearIcon');
	},
	'List screen must show a filter input': function (browser) {
		browser.adminUIListScreen.assertElementIsVisible('filterDropdown');
	},
	'List screen must show a column input': function (browser) {
		browser.adminUIListScreen.assertElementIsVisible('columnSelectionDropdown');
	},
	'List screen must show a download input': function (browser) {
		browser.adminUIListScreen.assertElementIsVisible('downloadDropdown');
	},
	// TODO:  For some reason the expand table width input control does not show in saucelabs' Firefox 44...why?
	//		It shows fine with local selenium server and Firefox 44.0.2
	// 'List screen must show an expand table width input': function (browser) {
	// 	browser.adminUIListScreen.assertElementIsVisible('expandTableIcon');
	// },
	'List screen must show a create list item button': function (browser) {
		browser.adminUIListScreen.assertElementIsVisible('createItemButton');
	},
	'List screen must show a page item count': function (browser) {
		browser.adminUIListScreen.assertElementIsVisible('pageItemCount');
	},
	'List screen must show a name column header': function (browser) {
		browser.adminUIListScreen.assertItemListHeaderVisible({ column: 1 });
		browser.adminUIListScreen.assertItemListHeaderContains({ column: 1, value: 'Name' });
	},
	'List screen must show an email column header': function (browser) {
		browser.adminUIListScreen.assertItemListHeaderVisible({ column: 2 });
		browser.adminUIListScreen.assertItemListHeaderContains({ column: 2, value: 'Email' });
	},
	'List screen must show an Is Admin column header': function (browser) {
		browser.adminUIListScreen.assertItemListHeaderVisible({ column: 3 });
		browser.adminUIListScreen.assertItemListHeaderContains({ column: 3, value: 'Is Admin' });
	},
	'List screen items must show a delete icon': function (browser) {
		browser.adminUIListScreen.assertItemDeleteIconVisible([
			{ row: 1, column: 1 },
			{ row: 2, column: 1 },
		]);
	},
	'List screen user item must show a name': function (browser) {
		browser.adminUIListScreen.assertItemFieldUIVisible([
			{ row: 1, column: 2, name: 'name',},
			{ row: 2, column: 2, name: 'name',},
		]);

		browser.adminUIListScreen.assertItemFieldValueEquals([
			{ row: 1, column: 2, name: 'name', value: 'e2e member',},
			{ row: 2, column: 2, name: 'name', value: 'e2e user',},
		]);
	},
	'List screen user item must show an email': function (browser) {
		browser.adminUIListScreen.assertItemFieldUIVisible([
			{ row: 1, column: 3, name: 'email',},
			{ row: 2, column: 3, name: 'email',},
		]);

		browser.adminUIListScreen.assertItemFieldValueEquals([
			{ row: 1, column: 3, name: 'email', value: 'member@test.e2e',},
			{ row: 2, column: 3, name: 'email', value: 'user@test.e2e',},
		]);
	},
	'List screen user item must have a Is Admin column': function (browser) {
		browser.adminUIListScreen.assertItemFieldUIVisible([
			{ row: 1, column: 4, name: 'isAdmin',},
			{ row: 2, column: 4, name: 'isAdmin',},
		]);

		browser.adminUIListScreen.assertItemFieldValueEquals([
			{ row: 1, column: 4, name: 'isAdmin', value: 'false',},
			{ row: 2, column: 4, name: 'isAdmin', value: 'true',},
		]);
	},
	'List screen user item must have a Is Member column': function (browser) {
		browser.adminUIListScreen.assertItemFieldUIVisible([
			{ row: 1, column: 5, name: 'isMember',},
			{ row: 2, column: 5, name: 'isMember',},
		]);

		browser.adminUIListScreen.assertItemFieldValueEquals([
			{ row: 1, column: 5, name: 'isMember', value: 'true',},
			{ row: 2, column: 5, name: 'isMember', value: 'false',},
		]);
	},
};
