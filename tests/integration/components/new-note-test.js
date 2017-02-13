import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('new-note', 'Integration | Component | new note', {
  integration: true
});

test('it renders with default string properties', function(assert) {
  this.render(hbs`{{new-note}}`);
  assert.equal(this.$('.spec-input-title').text().trim(), '', 'title is empty string');
  assert.equal(this.$('.spec-input-date').text().trim(), '', 'date is empty string');
  assert.equal(this.$('.spec-textarea-notes').text().trim(), '', 'notes is empty string');
});

test('it renders an updated values', function(assert) {
  this.set('title', 'bob');
  this.set('date', 'now');
  this.set('notes', 'bobs note');
  this.render(hbs`{{new-note title=title date=date notes=notes}}`);
  assert.equal(this.$('.spec-input-title').val(), 'bob', 'title equates to bob');
  assert.equal(this.$('.spec-input-date').val(), 'now', 'date equates to now');
  assert.equal(this.$('.spec-textarea-notes').val(), 'bobs note', 'notes equates to bobs note');
});
