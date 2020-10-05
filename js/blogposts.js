//import {get} from "./utility.js";

//To identify current page and make appropriate API call
const currentPageIdentifier = window.location.pathname.slice(1);
switch (currentPageIdentifier) {
    case 'home.html': get("./api/homeblogposts.json", loadBlogPosts);
        break;
    case 'about.html': get("./api/aboutblogposts.json", loadBlogPosts);
        break;
    case 'services.html': get("./api/servicesblogposts.json", loadBlogPosts);
        break;
    case 'contact.html': get("./api/contactblogposts.json", loadBlogPosts);
        break;
}

//Loads blog posts dynamically for each page from its corresponding blogposts.json file
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