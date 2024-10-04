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
function embedTweet(tweetLink, targetBlock) {
    if (!tweetLink) {
        console.error("No tweet link provided.");
        return;
    }
    const tweetID = getTweetID(tweetLink);
    
    twttr.ready(function(twttr) {
        twttr.widgets.createTweet(
            tweetID,
            targetBlock, // Use the provided target block
            {
                theme: 'light', // or dark
                conversation: 'none',
                dnt: true,
            }
        ).then(function(el) {
            console.log('Tweet added.');
        }).catch(function(error) {
            console.error("Error embedding tweet:", error);
        });
    });
}

// Function to extract tweet URL and embed it
function extractAndEmbedTweet(block) {
    const tweetLinkElement = block.querySelector('a'); // Look for the <a> tag in the block
    if (tweetLinkElement) {
        const tweetLink = tweetLinkElement.href; // Extract the tweet link
        embedTweet(tweetLink, block); // Pass the tweet link and block to embedTweet
    } else {
        console.error("Tweet URL not found in the block.");
    }
}

// Main function to decorate the block
export default function decorate(block) {
    // Clear any existing content in the block
    block.textContent = '';

    // Extract and embed the tweet
    extractAndEmbedTweet(block);
}
