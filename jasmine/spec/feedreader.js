/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
            /* This is our first test suite - a test suite just contains
             * a related set of tests. This suite is all about the RSS
             * feeds definitions, the allFeeds variable in our application.
             */
            describe('RSS Feeds', function () {
                /* This is our first test - it tests to make sure that the
                 * allFeeds variable has been defined and that it is not
                 * empty. Experiment with this before you get started on
                 * the rest of this project. What happens when you change
                 * allFeeds in app.js to be an empty array and refresh the
                 * page?
                 */
                it('are defined', function () {
                    expect(allFeeds).toBeDefined();
                    expect(allFeeds.length).not.toBe(0);
                });


                /* This test loops through each feed
                 * in the allFeeds object and ensures it has a URL defined
                 * and that the URL is not empty.
                 */
                it("have URLs", function () {
                    allFeeds.forEach(function (feed) {
                        expect(feed.url).toBeDefined();
                        expect(feed.url.length).not.toBe(0);
                    });
                });


                /* This test loops through each feed
                 * in the allFeeds object and ensures it has a name defined
                 * and that the name is not empty.
                 */
                it("have names", function () {
                    allFeeds.forEach(function (feed) {
                        expect(feed.name).toBeDefined();
                        expect(feed.name.length).not.toBe(0);
                    });
                });
            });


            /*A new test suite named "The menu" is created*/
            describe("The menu", function () {
                        let body, menuElement;
                        beforeEach(function () {
                            body = document.body;
                            menuElement = document.querySelector('.menu-icon-link');
                        });

                        /* This test ensures the menu element is
                         * hidden by default. 
                         */
                        it('element should be hidden by default.', function () {
                            expect($(document.body).hasClass('menu-hidden')).toBe(true);
                        });

                        /* This test ensures the menu changes
                         * visibility when the menu icon is clicked. This test
                         * should have two expectations: does the menu display when
                         * clicked and does it hide when clicked again.
                         */
                        it('element should change visibility on click', function () {
                            menuElement.click();
                            expect($(document.body).hasClass('menu-hidden')).not.toBe(true);
                            menuElement.click();
                            expect($(document.body).hasClass('menu-hidden')).toBe(true);
                        });
                    });


            /* A new test suite named "Initial Entries" is created*/
            describe('Initial Entries', function () {
                /* This test ensures when the loadFeed
                 * function is called and completes its work, there is at least
                 * a single .entry element within the .feed container.
                 * Remember, loadFeed() is asynchronous so this test will require
                 * the use of Jasmine's beforeEach and asynchronous done() function.
                 */
                beforeEach(function (done) {
                    loadFeed(0, done);
                });

                it('should contain at least a single entry element within feed container', function (done) {
                    let totalEnteries = $('.feed .entry').length;
                    expect(totalEnteries).toBeGreaterThan(0);
                    done();
                });
            });

            /* A new test suite named "New Feed Selection" */
            describe("New Feed Selection", function () {
                /* This test ensures when a new feed is loaded
                 * by the loadFeed function that the content actually changes.
                 * Remember, loadFeed() is asynchronous.
                 */
                let oldFeed;
                beforeEach(function (done) {
                    loadFeed(0, function () {
                        oldFeed = document.querySelector(".feed").innerHTML;
                        loadFeed(1, function () {
                            done();
                        });
                    });
                });
                // Make sure when new feed is loaded using loadFeed function,
                // the content changes
                it("content actually changes", function (done) {
                    const newFeed = document.querySelector(".feed").innerHTML;
                    expect(oldFeed).not.toBe(newFeed);
                    done();
                });
            });
        }());
                    
