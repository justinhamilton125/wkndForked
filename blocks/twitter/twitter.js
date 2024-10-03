window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];

    t.ready = function(f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));

// Function to extract tweet ID from the full tweet URL
function getTweetID(url) {
    const tweetID = url.split('/').pop().split('?')[0]; // Get the last part before query parameters
    return tweetID; // Return the tweet ID
}

// Function to embed the tweet
function embedTweet(tweetLink) {
    const tweetID = getTweetID(tweetLink);
    const twitterBlock = document.querySelector('.twitter.block div div'); // Select the target div

    twttr.ready(function(twttr) {
        twttr.widgets.createTweet(
            tweetID,
            twitterBlock, // Use the selected div
            {
                theme: 'light', // or dark
                conversation: 'none',
                dnt: true,
            }
        ).then(function(el) {
            console.log('Tweet added.');
        });
    });
}

// Example usage (you can replace this with user input or another trigger)
embedTweet('https://x.com/Keysight/status/1615097861619818499'); // Replace with user input link
