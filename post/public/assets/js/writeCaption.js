import { SelectImageService } from "../../services/selectImage-service.js";
import {PostService} from "../../services/post-service.js";
import {UserService} from "../../services/user-service.js";

document.addEventListener('DOMContentLoaded', async function () {
    const selectImage = new SelectImageService();
    const post = new PostService();
    const user = new UserService();

    async function getUserId(id){
        const array = await user.getUser(id);
        return array.id;
    }
    async function getPosts(){
        return await post.getPosts();
    }
    async function getIdPost(obj){
        const len = obj.length;
        const getId = obj[len-1].id;
        return getId;
    }
    //console.log("url selected: ",selectImage.getUrlPhoto());
    const url = selectImage.getUrlPhoto();
    const sectionPhoto = document.querySelector('.photo');
    const tagImg = document.createElement("img");
    tagImg.setAttribute("class", "photo-img");
    tagImg.setAttribute("src",url);
    sectionPhoto.appendChild(tagImg);
    const inputElement = document.querySelector('.inputText');
    var userById, idPost, newPost;
    inputElement.addEventListener('input', async (event)=>{
       // console.log('O valor do input mudou para:', event.target.value);
        try {
             userById = await getUserId(5632);
            //console.log('Usuário:', userById);

            const obj = await getPosts();
           // console.log("Objeto:", obj);
            
            idPost = await getIdPost(obj);
            console.log("ID do último post:", idPost);
            idPost++;
            newPost = {
                id: idPost,
                userId: userById,
                content: event.target.value,
                photoUrl: url,
            };
            
        } catch (error) {
            console.error('Erro ao obter dados:', error);
        }
        
    });

    const button = document.querySelector('.share');
    button.addEventListener('click', async()=>{
        await post.createPost(newPost);
    });

});