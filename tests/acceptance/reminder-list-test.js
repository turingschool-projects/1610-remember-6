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

test('failing to save an edited reminder will show a visual cue', function(assert) {
    visit('reminders/new');
    fillIn('.spec-input-title', 'Remind me to go to class');
    fillIn('.spec-input-date', 'Tomorrow');
    fillIn('.spec-textarea-notes', 'Because');
    click('.add-notes--submit');

    andThen(function() {
      assert.equal(currentURL(), 'reminders/new', 'should route to reminders/new');
      assert.equal(find('.spec-reminder-item').length, 1, 'should create a note');
      assert.equal(find('.spec-reminder-item').text().trim(), 'Remind me to go to class', 'should list original note title');
    });

    click('.spec-reminder-item:first');
    click('.spec-link-to-edit');

    andThen(function() {
      assert.equal(find('.dirty-attribute').length, 0, 'reminder should not have a class of dirty-attribute');
    })

    andThen(function() {
      assert.equal(currentURL(), '/reminders/1/edit', 'should route to edit page')
    });

    fillIn('.spec-input-title', 'Remind me to get a job tomorrow');
    fillIn('.spec-input-date', 'Tomorrow');
    fillIn('.spec-textarea-notes', 'Nah');

    andThen(function() {
      assert.equal(find('.spec-reminder-item').text().trim(), 'Remind me to get a job tomorrow', 'should list updated title on page');
    });

    andThen(function() {
      assert.equal(find('.dirty-attribute').length, 1, 'reminder should have a class of dirty-attribute');
    })
  });
