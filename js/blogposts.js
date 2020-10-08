//Function identifies current page and makes appropriate API call
function fetchBlogPostsDetails() {
    const currentPage = currentPageIdentifier();
    get('./api/' + currentPage + 'BlogPosts.json', loadBlogPosts);
}

fetchBlogPostsDetails();

//Loads blog posts dynamically for each page from its corresponding blogposts.json file
function loadBlogPosts(blogPostsData) {
    const posts = document.querySelector('#posts');
    for (let blogPostObj of blogPostsData) {
        const listItem = document.createElement('li');
        const listItemAnchor = createNewAnchorElement(blogPostObj['href']);
        const listItemAnchorImage = createNewImgElement(blogPostObj['img-path'], blogPostObj['alt']);
        listItemAnchor.appendChild(listItemAnchorImage);
        listItem.appendChild(listItemAnchor);
        posts.appendChild(listItem);
    }
}