import { SelectImageService } from "../../services/selectImage-service.js";

document.addEventListener('DOMContentLoaded', async function () {
    const selectImage = new SelectImageService();

    async function selectImages(pos) {
        return await selectImage.getPhoto(pos);
    }

    
    var sectionPhotos = document.querySelector('.wrapper'); 
    var aux;
    const positions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    const element =  positions.map(async pos=>{
        const div = document.createElement("div");
        div.setAttribute("class", "wrapper-item");   
        div.setAttribute("id", pos);
        const img = document.createElement("img");
        const photo = await selectImages(pos);
        img.setAttribute("src", photo);
        div.appendChild(img);
        sectionPhotos.append(div);
        div.addEventListener('click', async()=>{
            //console.log(`Div at position ${pos} clicked!`);
            var sectionPhotos = document.querySelector('.main-photo'); 
            var photo = document.querySelector(".main-photo>img");
            var photoSelected = document.querySelector(`[id="${pos}"]>img`);
            //console.log('photoselected',photoSelected);
          //  const photoItem = document.querySelector('.wrapper-item');
            if(photo){
                const photoUrl = await selectImages(pos);
                photo.setAttribute("src", photoUrl ); 
                const photoBefore = document.querySelector(`[id="${aux}"]>img`);
                photoBefore.removeAttribute("class", "selected");
                photoSelected.setAttribute("class","selected");
                sectionPhotos.appendChild(photo);
                aux=pos;
            }else{
                var photo = document.createElement("img");
                aux=pos;
                const photoUrl = await selectImages(pos);
                photo.setAttribute("src", photoUrl ); 
                photoSelected.setAttribute("class","selected");
                sectionPhotos.appendChild(photo);
            }
          //  console.log("url selected: ",selectImage.getUrlPhoto());
        });
    });
  
    



   
    

});
