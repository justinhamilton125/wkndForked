function embedTweet(tweetUrl) {
    // Your embedding logic here (e.g., insert into DOM, console log, etc.)
    console.log(`Embedding tweet: ${tweetUrl}`);
}

function extractAndEmbedTweet() {
    // Example of your existing HTML structure
    const tweetBlock = document.querySelector('.twitter-tweet'); // Adjust selector as needed

    // Assuming the tweet URL is contained in the blockquote
    const blockquote = tweetBlock.querySelector('blockquote.twitter-tweet');
    const tweetUrl = blockquote.querySelector('a[href*="twitter.com"]').href;

    // Call the embed function with the extracted URL
    embedTweet(tweetUrl);
}

// Call the function on page load
window.onload = extractAndEmbedTweet;