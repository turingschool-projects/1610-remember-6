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

test('Prompt user to enter new note when no notes are present', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/reminders', 'we be on the correct url');
    assert.equal(find('.spec-reminder-item').length, 0, 'no reminders present');
    assert.equal(find('.spec-prompt-message').length, 1, 'message div is present when no reminders exist')
    assert.equal(find('.spec-prompt-message').text(), 'enter a reminder', 'should display a condescending message when no notes are present')
  })
})

test('Clicking delete removes from reminders..', function(assert) {
  server.createList('reminder', 5);
  visit('/reminders');
  andThen(function() {
    assert.equal(find('.spec-reminder-item').length, 5, 'there are 5 items present');
    click('.spec-reminder-delete:first');
  })
  andThen(function() {
    assert.equal(find('.spec-reminder-item').length, 4, 'now there are 4');
  })
})

test('clicking delete from an individual reminder...', function(assert) {
  server.createList('reminder', 5);
  visit('/reminders');
  click('.spec-reminder-item:first');

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1', 'we are now on the nested URL');
    click('.spec-delete-individual');
  })

  andThen(function() {
    assert.equal(currentURL(),'/reminders', 'transition to reminders route')
    assert.equal(find('.spec-reminder-item').length, 4, 'and the reminder has been deleted')
  })

});
