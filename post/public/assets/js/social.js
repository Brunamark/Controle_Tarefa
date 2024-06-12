import { SelectImageService } from "../../services/selectImage-service.js";
import { PostService } from "../../services/post-service.js";
import { UserService } from "../../services/user-service.js";
import { LikeService } from "../../services/likes-service.js";
import { StorageService} from "../../services/localStorage-service.js"
document.addEventListener('DOMContentLoaded', async function () {
    const selectImage = new SelectImageService();
    const post = new PostService();
    const user = new UserService();
    const likeServ = new LikeService();
    const key = "like";
    const keyComment = "comment";


    

    async function selectPost() {
        const obj = await post.getPosts();
        return obj;
    }
    async function getUrl(array, id) {
        const url = array.photoUrl;
        return url;
    }
    async function getUserId(array) {
        const userId = array.userId;
        return userId;
    }
   
    async function getUsers() {
        const users = await user.getUsers();
        return users;
    }
    function getIndexById(arr, id) {
        return arr.findIndex(item => item.id === id);
    }
    async function getUserName(obj,id) {
        const pos = getIndexById(obj, id);
        const name = obj[pos].name;
        return name;
    }
    async function getProfilePic(obj, id) {
        const pos = getIndexById(obj, id);
        const profilePic = obj[pos].profilePhotoUrl;
        return profilePic;
    }
    
    async function getContent(array){
        const content = array.content;
        return content;
    }
    async function getLikes(){
        const obj = await likeServ.getLikes();
        return obj;
    }
    async function getLastIdLike(obj){
        var len = obj.length;
        var id = obj[len-1].id;
        return id;
    }
    async function getPostId(array){
        return await array.id;
    }
    // console.log(await selectPost());
    const object = await selectPost();
    let idUser = await getUsers();
    const ID = idUser[0].id ;
    object.reverse().map(async (currentValue, index) => {
        const sectionElement = document.querySelector('.content-post');
        const divElement = document.createElement('div');
        divElement.setAttribute("class", "posts");
        const postElement = document.createElement('img');
        postElement.setAttribute("class", "post-img");
        const url = await getUrl(currentValue, index)
        postElement.setAttribute("src", url);
        divElement.appendChild(postElement);
        sectionElement.appendChild(divElement);
        const divProfile = document.createElement("div");
        divProfile.setAttribute("class", "div-profile-pic");
        const usersObj = await getUsers();
        const userId = await getUserId(currentValue);
        //console.log(userId);
        //console.log("usersObj: ",usersObj);
        // console.log("urlprofile: ", await getProfilePic(usersObj,userId));

        const urlProfilePic = await getProfilePic(usersObj, userId);
        const section = document.createElement("section");
        section.setAttribute("class","picture-like-comment");
        const sectionUser = document.createElement("section");
        sectionUser.setAttribute("class","user-profile-name");
        const profilePic = document.createElement("img");
        profilePic.setAttribute("src", urlProfilePic);
        profilePic.setAttribute("class", "profile-picture");
        divProfile.appendChild(profilePic);
        sectionUser.appendChild(divProfile);
        
        const userName = await getUserName(usersObj,userId);
        const divContent = document.createElement("div");
        divContent.setAttribute("class","content-div");
        const contentElement = document.createElement("p");
        contentElement.innerHTML = userName;
        divContent.appendChild(contentElement);
        sectionUser.appendChild(divContent);
        section.appendChild(sectionUser);
        divElement.appendChild(section);

        const divCont = document.createElement("div");
        divCont.setAttribute("class","cont-like-comment");
        const like = document.createElement("img");
        like.setAttribute("src","../assets/images/heart.svg");
        like.setAttribute("class", "like");
        like.setAttribute("id",`${index}`);
        divCont.appendChild(like);
        const aElement = document.createElement("a");
        aElement.setAttribute("href","./comments.html");
        aElement.setAttribute("class","link-comment");
        const comment = document.createElement("img");
        comment.setAttribute("src","../assets/images/comment.svg");
        comment.setAttribute("class","comment");
        aElement.appendChild(comment);
        divCont.appendChild(aElement);
     // divCont.appendChild(comment);
        section.appendChild(divCont);

        const content = await getContent(currentValue); 
        const sectionContent = document.createElement("section");
        sectionContent.setAttribute("class","content");
        const pContent = document.createElement("p");
        pContent.innerHTML = content;
        sectionContent.appendChild(pContent);
        divElement.appendChild(sectionContent);
        const likes = document.querySelector(`[id="${index}"]`);
        likes.addEventListener('click',async(event)=>{
           // event.preventDefault();
            console.log("oi");
            like.setAttribute("src", "../assets/images/filled_heart.svg");
            console.log("Liked post ID:", currentValue.id);
            console.log("Liked post ID:", currentValue);
            console.log("get likes obj: ",await getLikes());
            const objLikes = await getLikes();
            const lastIdLike = await getLastIdLike(objLikes);
            console.log("id like: ", lastIdLike);
          
            var newLike = {
                id: lastIdLike+1,
                postId : currentValue.id,
                userId: ID,
            };
            StorageService.saveData(key,newLike);
            //await likeServ.createLike(newLike);
            
            
        });
        aElement.addEventListener('click', async()=>{
            const test = await getPostId(currentValue);
            console.log(test);
            StorageService.saveData(keyComment,test);
        });
        


        
    });
    

 
});
