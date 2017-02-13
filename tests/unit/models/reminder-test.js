import { moduleForModel, test } from 'ember-qunit';

moduleForModel('reminder', 'Unit | Model | reminder', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let reminder = this.subject();
  assert.ok(!!reminder);
});

test('should render an object with title, date, and notes', function(assert) {
  let reminder = this.subject({title: 'doesnt matter', date: "12/12/16", notes: 'some stuff'});
  assert.equal(reminder.get('title'), 'doesnt matter', 'has a title');
  assert.equal(reminder.get('date'), '12/12/16', 'has a date');
  assert.equal(reminder.get('notes'), 'some stuff', 'has notes');
});

test('it has an attribute: title', function(assert) {
  var reminder = this.subject();
  var hasAttr = Object.keys(reminder.toJSON()).indexOf('title') > -1;
  assert.ok(hasAttr, 'has a title attribute');
});

test('it has an attribute: date', function(assert) {
  var reminder = this.subject();
  var hasAttr = Object.keys(reminder.toJSON()).indexOf('date') > -1;
  assert.ok(hasAttr, 'has a date attribute');
});

test('it has an attribute: notes', function(assert) {
  var reminder = this.subject();
  var hasAttr = Object.keys(reminder.toJSON()).indexOf('notes') > -1;
  assert.ok(hasAttr, 'has a notes attribute');
});
