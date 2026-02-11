const postBtn = document.getElementById("postBtn");
const input = document.getElementById("tweetInput");
const timeline = document.getElementById("timeline");

postBtn.onclick = () => {

    const text = input.value.trim();
    if(text === "") return;

    const tweet = document.createElement("div");
    tweet.className = "tweet";

    tweet.innerHTML = `
        <div class="tweet-header">
            <div class="avatar">N</div>
            <strong>You</strong>
        </div>

        <p>${text}</p>

        <div class="actions">
            <span class="like">❤ 0</span>
            <span class="retweet">🔁 0</span>
        </div>
    `;

    timeline.prepend(tweet);
    input.value = "";

    let likes = 0;
    let rts = 0;

    tweet.querySelector(".like").onclick = function(){
        likes++;
        this.innerHTML = "❤ " + likes;
    };

    tweet.querySelector(".retweet").onclick = function(){
        rts++;
        this.innerHTML = "🔁 " + rts;
    };
};
