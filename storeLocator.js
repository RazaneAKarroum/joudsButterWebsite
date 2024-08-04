const storeName = document.getElementsByClassName("storeName");
const storeMap = document.getElementById("googleMapFrame");
//const iframeWindow = storeMap.contentWindow;
//console.log(storeMap.src);

Array.from(storeName).forEach((store)=>{
    store.addEventListener('click', (e) => {
        //console.log(storeMap.attributes.src);
        let mapLocation = e.target.dataset.src;
        console.log(mapLocation);
        let newStore = storeMap.attributes.src;
        newStore = mapLocation;
        console.log(newStore);
       //console.log(storeMap.src);
       
       

    })
 });

// storeName.map(store => {
//     store.addEvenetListener("click", (e) => {
//         let mapLocation = e.target.data-scr;
//         console.log(mapLocation);
//     })
// });