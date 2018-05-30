/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

  describe('RSS Feeds', function() {

    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* A test that ensures it has a URL defined
     * and that the URL is not empty.
     */

    it('have URLs', function() {
      allFeeds.forEach(function(item) {
        expect(item.url).toBeDefined();
        expect(item.url.length).not.toBe(0);
      });
    });


    /* A test that ensures it has a name defined
     * and that the name is not empty.
     */

    it('have names', function() {
      allFeeds.forEach(function(item) {
        expect(item.name).toBeDefined();
        expect(item.name.length).not.toBe(0);
      });
    });
  });


  describe('The menu', function() {

    /* A test that ensures the menu element is
     * hidden by default.
     */

    it('is hidden', function() {
      var menuHidden = $('body');
      expect(menuHidden.hasClass('menu-hidden')).toBe(true);
    });


    /* A test that ensures the menu changes
     * visibility when the menu icon is clicked.
     */

    it('is clicked', function() {
      var menuIcon = $('.menu-icon-link');
      var body = $('body');
      menuIcon.click();
      expect(body.hasClass('menu-hidden')).toBe(false);
      menuIcon.click(); // a menu is clicked again
      expect(body.hasClass('menu-hidden')).toBe(true);
    });
  });

  describe('Initial Entries', function() {

    /* A test that ensures there is at least
     * a single .entry element within the .feed container.
     */

    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it('have at least a single entry element', function(done) {
      var entries = $('.feed .entry');
      expect(entries.length).toBeGreaterThan(0);
      done();
    });
  });

  describe('New Feed Selection', function() {

    /* A test that ensures that the content actually changes.
     */

    var oldEntry;
    var newEntry;

    beforeEach(function(done) {
      loadFeed(0, function() {
        oldEntry = $('.feed .entry').text();
        loadFeed(1, function() {
          newEntry = $('.feed .entry').text();
          done();
        });
      });
    });

    it('has changed content', function(done) {
      expect(oldEntry).not.toEqual(newEntry);
      done();
    });

  });
});