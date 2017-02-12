import { test } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance'

moduleForAcceptance('Acceptance | new note')

  test('should add a new note on submit with valid input', function(assert) {
    visit('reminders/new');
    fillIn('.spec-input-title', 'Banana');
    fillIn('.spec-input-date', 'One Bunch');
    fillIn('.spec-textarea-notes', 'Only extra green ones');
    click('.add-notes--submit');
    andThen(function() {
      assert.equal(currentURL(), 'reminders/new', 'should route to reminders/new');
      assert.equal(find('.spec-reminder-item').length, 1, 'should show 1 notes');
      assert.equal(find('.spec-reminder-item').text().trim(), 'Banana', 'should list note title');
    });
  });
