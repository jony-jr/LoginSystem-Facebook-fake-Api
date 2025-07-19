///////// all Posts with jsonplaceholder Task///////////

var allPosts = [];
var allComments = [];

var postsSection = document.querySelector('.allPosts');




(async function(){
    var postReq = await fetch('https://jsonplaceholder.typicode.com/posts')
    allPosts = await postReq.json();

    var comReq = await fetch('https://jsonplaceholder.typicode.com/comments')
    allComments = await comReq.json();
    
    displayAllPosts();


})();



function displayAllPosts(){
     var html = '';
    for(var i = 0; i < allPosts.length; i++){

        var commentData = getPostComment(allPosts[i].id);

        html += `    

                             <div class="post rounded-2 p-2 rounded-3 bg-body-tertiary">
             <div class="head">
                 <div class="d-flex justify-content-between">
                     <div class="person d-flex align-item-center">
                         <img src="./img/facebook-person.avif" alt="" >
                         <div class="mx-2">
                             <h6 class="">${allPosts[i].title}</h6>
                             <p>june 29 at 6:56 PM</p>
                         </div>
                     </div>
                     <i class="fa-solid fa-xmark"></i>
                 </div>
                 <p>${allPosts[i].body}</p>
             </div>
             <figure>
                 <img src="./img/facebook-person.avif" class="w-100" alt="">
             </figure>
             <div class="reacts d-flex justify-content-between">
                 <div class="">
                     <i class="fa-solid fa-heart text-danger"></i>
                     <i class="fa-solid fa-thumbs-up text-primary"></i>
                     <i class="fa-solid fa-face-sad-tear text-warning"></i>
                     <span>Ahmed Wael and 169 others</span>
                 </div>
                <div class="">
                     <!-- number of comments -->
                     <span>${ commentData.count}</span>
                     <i class="fa-solid fa-comment"></i>
                </div>
             </div>
             <div class="d-flex justify-content-around mt-3 my-border p-2">
                 <div class="tafaool p-1 rounded-1">
                     <i class="fa-solid fa-thumbs-up"></i>
                     <span>Like</span>
                 </div>
                 <div class="tafaool p-1 rounded-1">
                     <i class="fa-solid fa-comment"></i>
                     <span>Comment</span>
                 </div>
                 <div class="tafaool p-1 rounded-1">
                     <i class="fa-solid fa-share"></i>
                     <span>Share</span>
                 </div>
             </div>
             <div class="comments">

            <details class="mt-2">
                <summary>View comments</summary>
                ${ commentData.commentsHtml}
            </details> 
             </div>
         </div>
 `;
    }
    
    postsSection.innerHTML = html;
    
}

 function getPostComment(postId){

    var comments = {
        commentsHtml : '',
        count : 0
    }
    for(var i = 0 ; i < allComments.length; i++){
        if(postId == allComments[i].postId){
            comments.commentsHtml += `
                <div class="comment d-flex my-2 gap-2">
                    <div class="">
                        <img src="./img/facebook-person.avif" class="comentImage" alt="">
                    </div>
                    <div class="coment-info ">
                        <h6>${allComments[i].name}</h6>
                        <p class="m-0">${allComments[i].body}</p>
                    </div>
                </div>
            `;
            comments.count++;
        }
    }

    return comments;

}