//To identify current page and make appropriate API call
const currentPageIdentifier = window.location.pathname.slice(1);
switch (currentPageIdentifier) {
    case 'home.html': get("./api/homeBlogPosts.json", loadBlogPosts);
        break;
    case 'about.html': get("./api/aboutBlogPosts.json", loadBlogPosts);
        break;
    case 'services.html': get("./api/servicesBlogPosts.json", loadBlogPosts);
        break;
    case 'contact.html': get("./api/contactBlogPosts.json", loadBlogPosts);
        break;
}

//Loads blog posts dynamically for each page from its corresponding blogposts.json file
function loadBlogPosts(blogPostsData) {
    const posts = document.querySelector('#posts');
    for(let eachBlogPost of blogPostsData){
        const listItem = document.createElement('li');
        const listItemAnchor = document.createElement('a');
        listItemAnchor.href = eachBlogPost['href'];
        const listItemAnchorImage = document.createElement('img');
        listItemAnchorImage.src = eachBlogPost['img-path'];
        listItemAnchorImage.alt = eachBlogPost['alt'];
        listItemAnchor.appendChild(listItemAnchorImage);
        listItem.appendChild(listItemAnchor);
        posts.appendChild(listItem);
    }
}