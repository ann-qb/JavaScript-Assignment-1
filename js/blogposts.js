//Function to identify current page and make appropriate API call
function makeAPICall() {
    const currentPage = currentPageIdentifier();
    get('./api/' + currentPage + 'BlogPosts.json', loadBlogPosts);
}

//Invoke function to identify current page and make appropriate API call
makeAPICall();

//Loads blog posts dynamically for each page from its corresponding blogposts.json file
function loadBlogPosts(blogPostsData) {
    const posts = document.querySelector('#posts');
    for (let eachBlogPost of blogPostsData) {
        const listItem = document.createElement('li');
        //Invoke utility function to create anchor element
        const listItemAnchor = createNewAnchorElement(eachBlogPost['href']);
        //Invoke utility function to create img element
        const listItemAnchorImage = createNewImgElement(eachBlogPost['img-path'], eachBlogPost['alt']);
        listItemAnchor.appendChild(listItemAnchorImage);
        listItem.appendChild(listItemAnchor);
        posts.appendChild(listItem);
    }
}