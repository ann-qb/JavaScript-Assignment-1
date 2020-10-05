//import {get} from "./utility.js";

get("./api/blogposts.json", loadBlogPosts);

//Load blog posts dynamically from blogposts.json
function loadBlogPosts(blogPostsData) {
    const numberOfBlogPosts = blogPostsData.length;
    const posts = document.querySelector('#posts');
    for (let i = 0; i < numberOfBlogPosts; i++) {
        const listItem = document.createElement('li');
        const listItemAnchor = document.createElement('a');
        listItemAnchor.href = blogPostsData[i]['href'];
        const listItemAnchorImage = document.createElement('img');
        listItemAnchorImage.src = blogPostsData[i]['img-path'];
        listItemAnchorImage.alt = blogPostsData[i]['alt'];
        listItemAnchor.appendChild(listItemAnchorImage);
        listItem.appendChild(listItemAnchor);
        posts.appendChild(listItem);
    }
}