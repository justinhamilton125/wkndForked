// Twitter Embed Initialization
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
function embedTweet(tweetLink, block) {
    if (!tweetLink) {
        console.error("No tweet link provided.");
        return;
    }
    const tweetID = getTweetID(tweetLink);

    twttr.ready(function(twttr) {
        // Use the embed function from the main code
        const embedHTML = embedTwitter(new URL(tweetLink));
        block.innerHTML = embedHTML; // Set the embed HTML directly to the block
        
        // Now create the tweet widget in the same block
        twttr.widgets.createTweet(
            tweetID,
            block.querySelector('.twitter-tweet'),
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

// Main function to extract tweet URL and embed it
function extractAndEmbedTweet(block) {
    const tweetLink = block.querySelector('a').href; // Assuming the link is within an anchor tag
    embedTweet(tweetLink, block);
}

// Call this function in the main embedding logic
export default function decorate(block) {
    const placeholder = block.querySelector('picture');
    const link = block.querySelector('a').href;
    block.textContent = '';

    if (placeholder) {
        const wrapper = document.createElement('div');
        wrapper.className = 'embed-placeholder';
        wrapper.innerHTML = '<div class="embed-placeholder-play"><button title="Play"></button></div>';
        wrapper.prepend(placeholder);
        wrapper.addEventListener('click', () => {
            loadEmbed(block, link, true);
            extractAndEmbedTweet(block); // Call to embed tweet after loading
        });
        block.append(wrapper);
    } else {
        const observer = new IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) {
                observer.disconnect();
                loadEmbed(block, link);
                extractAndEmbedTweet(block); // Call to embed tweet after loading
            }
        });
        observer.observe(block);
    }
}
