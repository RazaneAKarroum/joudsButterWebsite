//const storeName = document.getElementsByClassName("storeName");
//const storeMap = document.getElementById("googleMapFrame");
//const storeList = document.getElementById('storeList');
const storesDiv = document.querySelector('.locationInfo');
const mapIframe = document.getElementById('googleMapFrame');
//const iframeWindow = storeMap.contentWindow;
//console.log(storeMap.src);

let stores = null;
// get datas from file json
fetch("stores.json")
  .then((response) => response.json())
  .then((data) => {
    stores = data;
    createStoreList();
  });

function createStoreList() {
    stores.forEach(store => {
      let listItem = document.createElement('div');
      listItem.onclick = (e) => {
        const mapUrl = store.src;
        mapIframe.src = mapUrl;
      };
      listItem.innerHTML = `<i class="fa-solid fa-location-dot"></i>
      <span class="storeName" >${store.name}</span>
              <p>${store.location}</p>
              <p>${store.tel}</p>
              <p>${store.openingHours}</p>`;
      
      storesDiv.appendChild(listItem);
    });
  }
  
  //createStoreList();

// Array.from(storeName).forEach((store)=>{
//     store.addEventListener('click', (e) => {
//         //console.log(storeMap.attributes.src);
//         let mapLocation = e.target.dataset.src;
//         console.log(mapLocation);
//         let newStore = storeMap.attributes.src;
//         newStore = mapLocation;
//         console.log(newStore);
//        //console.log(storeMap.src);
       
       

//     })
//  });

// storeName.map(store => {
//     store.addEvenetListener("click", (e) => {
//         let mapLocation = e.target.data-scr;
//         console.log(mapLocation);
//     })
// });