const blogPostsData = new XMLHttpRequest();
blogPostsData.open("GET", "./api/blogposts.json");
blogPostsData.send();
blogPostsData.addEventListener("load", blog);

function blog() {
    const blogPosts = JSON.parse(blogPostsData.response);
    const posts = document.getElementById('posts');
    for(let i=0; i<blogPosts.length; i++){
        const listItem = document.createElement('li');
        const listItemAnchor = document.createElement('a');
        listItemAnchor.href = blogPosts[i]['href'];
        const listItemAnchorImage = document.createElement('img');
        listItemAnchorImage.src = blogPosts[i]['img-path'];
        listItemAnchorImage.alt = blogPosts[i]['alt'];
        listItemAnchor.appendChild(listItemAnchorImage);
        listItem.appendChild(listItemAnchor);
        posts.appendChild(listItem);
    }
}