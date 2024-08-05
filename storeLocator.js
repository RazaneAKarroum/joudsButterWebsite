//const storeName = document.getElementsByClassName("storeName");
//const storeMap = document.getElementById("googleMapFrame");
//const storeList = document.getElementById('storeList');
const storesDiv = document.getElementsByClassName('locationInfo');
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
      const listItem = document.createElement('div');
      listItem.innerHTML = `<i class="fa-solid fa-location-dot"></i>
      <span class="storeName" >${store.name}</span>
              <p>${store.location}</p>
              <p>Tel: 03 383 999</p>
              <p>opening hours: 10am - 8pm</p>`;
      listItem.addEventListener('click', () => {
        const mapUrl = store.src;
        mapIframe.src = mapUrl;
      });
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