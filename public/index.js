

let storiesArray;
let main_text = '';
let currCategory = '';
async function fetchData() {
  try {
      const response = await fetch('./stories.json');
      const jsObject = await response.json();
      storiesArray = jsObject.stories; // This is an array of all stories
  } catch (error) {
      console.error('Error:', error);
  }
}

function displayStories(stories) {
  // Your logic to display or use the processed data goes here
  var main_text = '';
  for (var i = 0; i < stories.length; i++) {
    // console.log('here');
    // console.log(stories[i].position);
    main_text += 
    `<div class="stories" onclick = "openPopup(); getVerse(${i});">` +
      `<img class="poster" src="${stories[i].image}" alt="404 image not found" onclick="showStory(${i})" style="object-fit:${stories[i].fit}; object-position:${stories[i].position};"> ` +
      `<div class="title">` +
        `<p>${stories[i].title}</p>` +
      `</div>
    </div>`;
  }
 
  // console.log(main_text);
  document.querySelector("main") .innerHTML = main_text;
}

async function execute() {
  await fetchData(); // Wait until fetchData() is done
  // console.log(storiesArray); // Log the array to the console
  displayStories(storiesArray); // Call displayStories() after fetchData() is done
}

execute();

// categories
let categoriesArray = [
  "Divine Intervention",
  "Old Testament",
  "New Testament",
  "Forgiveness",
  "Judgement",
  "Covenant",
  "Battle",
  "Law",
  "Parable",
  "Encounter",
  "Deliverance",
  "Miracle",
  "Faithfulness",
  "Repentance",
  "Revelation"
];
let categories_text = document.querySelector("nav").innerHTML;

for (let i = 0; i < categoriesArray.length; i++) {
  categories_text += 
  `<div>
      <span class="show"> 
          <button onclick="showResult('${categoriesArray[i]}')">${categoriesArray[i]}</button>
      </span>
  </div>`;
}


document.querySelector(".nav").innerHTML = categories_text;

function showResult(category) {
  var main_text = '';
  currCategory = `| ` +category;
  
  for (var i = 0; i < storiesArray.length; i++) {
    // Check each category of the story
    for (var j = 0; j < storiesArray[i].metadata.categories.length; j++) {
      if(storiesArray[i].metadata.categories[j] === category) {
        main_text += 
        `<div class="stories" onclick = showStory(${i})>` +
        `<img class = poster src="${storiesArray[i].image}" alt="404 image not found">` +
        `<div class="title">` +
        `<p>${storiesArray[i].title}</p>` +
        `</div>
        </div>`;
        
        
      }
    }
  }
  
  document.querySelector("main").innerHTML = main_text;
  
  // console.log(main_text);
  changeTitle(currCategory);
}

function showStory(index)
{
  // <img class = poster src="${storiesArray[index].image}" alt="image.png" >
  let story = `
  <span class="close" onclick="closePopup(event)">&times;</span>
  <h2 class="displayHeading">${storiesArray[index].title} ( ${storiesArray[index].reference} )</h2>
    
      <img src="${storiesArray[index].image}" class="displayImage" alt="404 image not found" >
      <div class = "biblicalVerse"></div>
    
    
  `;
  document.querySelector(".popup-content").innerHTML = story;
  openPopup();
  // console.log(story);
  // console.log("i am in story");
   changeTitle(`| `+storiesArray[index].title);
}


            // Get the popup
var popup = document.getElementById("myPopup");

// Get the close button
var close = document.getElementsByClassName("close")[0];

// When the user clicks on the close button, close the popup
// close.onclick = function() {
//     popup.style.display = "none";
// }

// Function to open the popup
function openPopup() {
  // console.log("Popup opened");
    popup.style.display = "block";
}

function closePopup(event) {
  // console.log(event.target.classList);

  // Check if the target element has either "popup" or "close" class
  if (!(event.target.classList.contains("popup") || event.target.classList.contains("close"))) {
    return;
  }

  // console.log("Popup closed");
  popup.style.display = "none";
  changeTitle(currCategory);
}

function changeTitle(newTItle)
{
  document.title = `EpicBibleStories ${newTItle}`;

}

// scroll for smaller screens
let scrollContainer;

function checkScreenSizeAndScroll() {
  // console.log('scroll');
  let screenWidth = window.innerWidth;
  scrollContainer = document.querySelector("nav");

  if (scrollContainer) {
     scrollContainer.removeEventListener("wheel", horizontalScrollHandler);
    scrollContainer.removeEventListener("wheel", verticalScrollHandler);
  }
  if(screenWidth < 650) {
    scrollContainer.addEventListener("wheel", horizontalScrollHandler);
  } else {
    scrollContainer.addEventListener("wheel", verticalScrollHandler);
  }
}

function horizontalScrollHandler(evt) {
  evt.preventDefault();
  let delta = Math.sign(evt.deltaY) * -50;
  this.scrollLeft += delta;
}

function verticalScrollHandler(evt) {
  evt.preventDefault();
   let delta = Math.sign(evt.deltaY) * 50;
  this.scrollTop += delta;
}

window.onload = checkScreenSizeAndScroll;
window.onresize = checkScreenSizeAndScroll;


function getVerse(index) {
  // console.log(storiesArray[index].content);
  fetch("http://localhost:3000/verse", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Uncomment this line
    },
    body: JSON.stringify({
      verse:JSON.stringify(storiesArray[index].reference), //verse is not yet a thing
    }),
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    console.log(storiesArray[index].reference);
    document.querySelector('.biblicalVerse').innerHTML = '<pre>' + result.message + '</pre>';
    console.log(result.message);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

