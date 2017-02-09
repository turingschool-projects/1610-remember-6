/* globals server */

import { test } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

import Ember from 'ember';

moduleForAcceptance('Acceptance | reminders list');

test('viewing the homepage', function(assert) {
  server.createList('reminder', 5);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/reminders', 'visting "/" redirects to "/reminders"');
    assert.equal(Ember.$('.spec-reminder-item').length, 5, 'renders 5 reminders with class .spec-reminder-item');
  });
});

test('clicking on an individual item', function(assert) {
  server.createList('reminder', 5);
  visit('/reminders');
  click('.spec-reminder-item:first');

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1', 'clicking the first item links to url /1');
    assert.equal(Ember.$('.spec-reminder-item:first').text().trim(), Ember.$('.spec-reminder-title').text().trim(), 'the individual title matches the first item in the reminders list');
    assert.equal(Ember.$('.active').length, 1, 'one item has class active');
  });
});
