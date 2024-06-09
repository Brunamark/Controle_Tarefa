import { SelectImage } from "./selectImage.js";

const selectImage = new SelectImage();

async function selectImages(){
  
    const photoUrl = await selectImage.getPhoto(0);
    

}


window.addEventListener("load", selectImages);