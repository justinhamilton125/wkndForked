export default function decorate(block) {
    // Load Twitter's widgets script
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
        
        // Use the provided target block to embed the tweet
        twttr.ready(function(twttr) {
            twttr.widgets.createTweet(
                tweetID,
                targetBlock,
                {
                    theme: 'dark', // or dark
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
    function extractAndEmbedTweet() {
        const tweetLinkElement = block.querySelector('a'); // Look for an <a> tag in the block
        if (tweetLinkElement) {
            const tweetLink = tweetLinkElement.href; // Extract the tweet link
            embedTweet(tweetLink, block); // Pass the tweet link and the block to embedTweet
        } else {
            console.error("Tweet URL not found in the block.");
        }
    }

    // Call the function to extract the tweet link and embed it
    extractAndEmbedTweet();
}
