import { test } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance'

moduleForAcceptance('Acceptance | edit note')

  test('should edit a note when user clicks edit this reminder', function(assert) {
    visit('reminders/new');
    fillIn('.spec-input-title', 'Remind me to go to class');
    fillIn('.spec-input-date', 'Tomorrow');
    fillIn('.spec-textarea-notes', 'Because');
    click('.add-notes--submit');
    andThen(function() {
      assert.equal(currentURL(), 'reminders/new', 'should route to reminders/new');
      assert.equal(find('.spec-reminder-item').length, 1, 'should create one note');
      assert.equal(find('.spec-reminder-item').text().trim(), 'Remind me to go to class', 'should list note title');
    });

    click('.spec-reminder-item:first');
    click('.spec-link-to-edit');
    andThen(function() {
      assert.equal(currentURL(), '/reminders/1/edit', 'should route to edit page')
    });

    fillIn('.spec-input-title', 'Remind me to get a job tomorrow');
    fillIn('.spec-input-date', 'Tomorrow');
    fillIn('.spec-textarea-notes', 'Nah');
    click('.edit-notes--submit');
    andThen(function() {
      assert.equal(currentURL(), '/reminders/1', 'clicking submit on edit page reroutes to individual reminders page');
      assert.equal(find('.spec-reminder-item').length, 1, 'should show 1 note on reminders page');
      assert.equal(find('.spec-reminder-item').text().trim(), 'Remind me to get a job tomorrow', 'should list updated title on page');
    });
  });
