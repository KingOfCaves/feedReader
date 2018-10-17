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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            // feeds are defined
            expect(allFeeds).toBeDefined();
            // feeds array is not empty
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all feeds have a url defined', function(){
            // requirements for valid http
            var urlRequired = ['http://', 'https://'];

            // loop through array of feeds
            allFeeds.forEach(function(feed){
                // each feed has a url defined
                expect(feed.url).toBeDefined();
                // each feed url is not empty
                expect(feed.url.length).not.toBe(0);

                // each feed is a valid url/request
                expect(
                    urlRequired.some(element => feed.url.includes(element))
                ).toBe(true);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all feeds have a name defined', function(){
            // loops through array of feeds, again
            allFeeds.forEach(function (feed) {
                // each feed has a name defined
                expect(feed.name).toBeDefined();
                // each feed name is not empty
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named 'The menu' */

    describe('The Menu', function() {
        var body;
        beforeEach(function(){
            body = document.body;
        });
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu should be hidden by default', function(){
            // body is hidden by default when page is loaded
            expect(body.className).toBe('menu-hidden');
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu should toggle hidden class', function(){
            var icon = document.querySelector('.menu-icon-link');

            // simulates icon click
            icon.click();
            //toggles menu-hidden class so that it appears
            expect(body.className === 'menu-hidden').toBe(false);
            //simulates icon click
            icon.click();
            //toggles menu-hidden class to that it is hidden again
            expect(body.className === 'menu-hidden').toBe(true);
        });
    });

    /* TODO: Write a new test suite named 'Initial Entries' */
    describe('Initial Entries', function () {
        var entryOne;

        beforeEach(async function(done){
            //waites for loadFeed of first feed to finish then defines entryOne
            await loadFeed(1, function(){
                entryOne = document.querySelector(".entry").innerHTML;
                // console.log(entryOne);
                done();
            });
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('ensure that loadFeed is working properly', function(done){
            // entryOne should be defined
            expect(entryOne).toBeDefined();
            // entryOne should not be empty
            expect(entryOne.length).not.toBe(0);
            done();
        });
    });

    /* TODO: Write a new test suite named 'New Feed Selection' */
    describe('New Feed Selection', function () {
        var
            feedOne,
            feedTwo;

        beforeEach(async function (done) {
            await loadFeed(1, function () {
                feedOne = document.querySelector(".feed").innerHTML;
                // console.log(feedOne);
                loadFeed(2, function () {
                    feedTwo = document.querySelector(".feed").innerHTML;
                    // console.log(feedTwo);
                    done();
                });
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('ensure that loadFeed is producing different entries', function(done){
            // feeds produce different results
            expect(feedOne != feedTwo).toBe(true);
            done();
        });
    });
}());