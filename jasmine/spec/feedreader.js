$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            // feeds are defined
            expect(allFeeds).toBeDefined();
            // feeds array is not empty
            expect(allFeeds.length).not.toBe(0);
        });

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

    describe('The Menu', function() {
        var body;
        beforeEach(function(){
            body = document.body;
        });

        it('menu should be hidden by default', function(){
            // body is hidden by default when page is loaded
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        it('menu should toggle hidden class', function(){
            var icon = document.querySelector('.menu-icon-link');

            // simulates icon click
            icon.click();
            //toggles menu-hidden class so that it appears
            expect(body.classList.contains('menu-hidden')).toBe(false);
            //simulates icon click
            icon.click();
            //toggles menu-hidden class to that it is hidden again
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function () {
        var entryOne;

        beforeEach(async function(done){
            //waites for loadFeed of first feed to finish then defines entryOne
            await loadFeed(1, function(){
                entryOne = document.querySelector(".feed .entry").innerHTML;
                // console.log(entryOne);
                done();
            });
        });

        it('ensure that loadFeed is working properly', function(done){
            // entryOne should be defined
            expect(entryOne).toBeDefined();
            // entryOne should not be empty
            expect(entryOne.length).not.toBe(0);
            done();
        });
    });

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

        it('ensure that loadFeed is producing different entries', function(done){
            // feeds produce different results
            expect(feedOne != feedTwo).toBe(true);
            done();
        });
    });
}());