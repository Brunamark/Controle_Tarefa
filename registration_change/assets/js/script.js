
document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.querySelector('#switch');
    const checkboxDone = document.querySelector('#switchBtn2');
    const buttonDone = document.querySelector('#addBtn');
    const addBtn2 = document.querySelector('#addText');
    const divBtn = addBtn2.parentNode;
    const containerText = divBtn.parentNode;
    const childDivAdd = addBtn2.childNodes;
    const divsContainer = containerText.childNodes;
    const divP = document.querySelector('.container-p');
    var textP = divP.childNodes;
    var onClick = false;


    addBtn2.addEventListener('click', (event)=>{
      if(onClick){
        onClick = false;
        containerText.style.height = '300px';
        childDivAdd[1].src = "/assets/images/minus.svg";
        textP[1].textContent = "Add your title";
        textP[1].style.color = '#FFC700';
       
        
      }
      else{
        onClick = true;
        childDivAdd[1].src = "/assets/images/plus_icon.svg";
        containerText.style.height = '20%';
        textP[1].textContent = "Add your text";
        textP[1].style.color = '#FFFF';
      }
     
      
      
    }, false);
    
    buttonDone.addEventListener('click', ()=>{
        alert("Done");
    },false);

    checkboxDone.addEventListener('change', ()=> {
      if(checkboxDone.checked){
        console.log("checked 2° btn");
      }
    });
  
    checkbox.addEventListener('change', ()=> {
      const sectionDone = document.querySelector('.completed-task');
      if (checkbox.checked) {
        sectionDone.style.visibility = "hidden";
        console.log("Checked");
        var section = document.createElement("section");
        section.setAttribute("class", "container-date");
        var text = document.createElement('p');
        text.textContent = "End Time:";
        section.appendChild(text);
        var timeEnd = document.createElement('input');
        let elementChild = document.querySelector('body > main > section.add-button');
        timeEnd.setAttribute("type","time");
        timeEnd.setAttribute("id","time");
        timeEnd.setAttribute("min","12:00");
        timeEnd.setAttribute("max", "18:00");
        timeEnd.setAttribute("required", "");
        section.appendChild(timeEnd);
        var elementParent = elementChild.parentNode;
        elementParent.insertBefore(section,elementChild);
        

        var sectionStart = document.createElement("section");
        sectionStart.setAttribute("class", "container-date");
        var text = document.createElement("p");
        text.textContent= "Start Time";
        sectionStart.appendChild(text);
        var timeStart = document.createElement('input');
        elementChild = document.querySelector('body > main > section.container-date');
        timeStart.setAttribute("type","time");
        timeStart.setAttribute("id","time");
        timeStart.setAttribute("min","12:00");
        timeStart.setAttribute("max", "18:00");
        timeStart.setAttribute("required", "");
        sectionStart.appendChild(timeStart);
        elementParent = elementChild.parentNode;
        elementParent.insertBefore(sectionStart,elementChild);
        text.style.marginTop = '-100px'; 
        
      } else {
        const sections = document.querySelectorAll('.container-date');
        
        if(sections){
          sections.forEach(section => {
            section.remove(); 
          });
        }
        sectionDone.style.visibility = "visible";
        console.log("Not checked");
      }
    }); 
  });