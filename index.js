const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { exit } = require('process');

// const url = 'https://scp-wiki.wikidot.com/scp-series';
// axios.get(url)
//   .then(response => {
//     const html = response.data;
//     fs.writeFile('download.html', html, (err) => {
//       if (err) {
//         console.error('Error saving file:', err);
//       } else {
//         console.log('HTML saved to page.html');
//       }
//     });
//   })
//   .catch(error => {
//     console.error('Error fetching HTML:', error);
//   });

// ! for all items 002 to 999 that are in html format
function createPath (pathNew){
    try {
      if (!fs.existsSync(pathNew)) {
        fs.mkdirSync(pathNew);
      }

    } catch (err) {
      console.error(err);
    }
}

// Creates all needed paths
let pathsCreating = ['html','html/item'];
Object.keys(pathsCreating).forEach(pathKey => {
  createPath(pathsCreating[pathKey]);
  
  // console.log(pathsCreating[pathKey]);
});

// const axios = require('axios');
// const path = require('path');
// const fs = require('fs');
let indexJson = {};
let seriesArray = []; //contains the index url of all series scps including 001 entires
let otherSeriesArray = []

// gets all the index from the api of all content avaliable, or at least it should
let indexURL = 'https://raw.githubusercontent.com/scp-data/scp-api/refs/heads/main/docs/data/scp/items/content_index.json';
regex = /series-\d+/; //testing regex if text has series in name

axios.get(indexURL)
  .then(response =>{

    indexJson = response.data;
    seriesArray.push('content_scp-001.json');
    Object.keys(indexJson).forEach(indKey=>{
      
      if(regex.test(indexJson[indKey])==true){
        // console.log(indKey);
        // console.log(indexJson[indKey]);
        seriesArray.push(indexJson[indKey]);
      }
      
      console.log(seriesArray);
    })
  }
  )



// example url https://raw.githubusercontent.com/scp-data/scp-api/refs/heads/main/docs/data/scp/items/content_series-1.json
let scpItemUrl = ['https://raw.githubusercontent.com/scp-data/scp-api/refs/heads/main/docs/data/scp/items/'];

async function getSCPItems(itemURL){
  let url = itemURL;

  axios.get(url)
  .then(response => {
    let data = response.data;

    Object.keys(data).forEach(key => {
    newJson = {
      
    }
    let numSCP = key;
    newJson.itemNumber = numSCP;
    newJson.description = data[key].raw_content;
    
    let jsonData = JSON.stringify(newJson, null, 2);
    
    let paths
    paths = path.join('html/item',`${numSCP}.json`);
    // console.log(paths);
    fs.writeFile(paths, jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Data written to file');
        }
    });
      
  });
  })
  .catch(error => {
    console.error('Error fetching HTML:', error);
  });

}

let i = -1;
while(i<(Object.keys(scpItemUrls)+1)){
  console.log(i);
  getSCPItems(scpItemUrls[i+1])
  i++
}

