

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
  var main_text = '';
  for (var i = 0; i < stories.length; i++) {
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
        `<div class="stories" onclick = "openPopup(); getVerse(${i});">` +
      `<img class="poster" src="${storiesArray[i].image}" alt="404 image not found" onclick="showStory(${i})" style="object-fit:${storiesArray[i].fit}; object-position:${storiesArray[i].position};"> ` +
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
  let story = `
  <span class="close" onclick="closePopup(event)">&times;</span>
  <h2 class="displayHeading">${storiesArray[index].title} ( ${storiesArray[index].reference} )</h2>
    
      <img src="${storiesArray[index].image}" class="displayImage" alt="404 image not found" >
      <div class = "biblicalVerse"></div>
    
    
  `;
  document.querySelector(".popup-content").innerHTML = story;
  openPopup();
  
   changeTitle(`| `+storiesArray[index].title);
}


 // Get the popup
var popup = document.getElementById("myPopup");

// Get the close button
var close = document.getElementsByClassName("close")[0];

// Function to open the popup
function openPopup() {
    popup.style.display = "block";
}

function closePopup(event) {
  

  // Check if the target element has either "popup" or "close" class
  if (!(event.target.classList.contains("popup") || event.target.classList.contains("close"))) {
    return;
  }

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

async function getVerse(index) {
  try {
      const response = await fetch(`http://labs.bible.org/api/?passage=${storiesArray[index].reference}&formatting=full`);
      
      if (!response.ok) {
          throw new Error('Error');
      }

      const htmlString = await response.text();

      // Create a temporary div element to hold the HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlString;

      // Extract and decode the text content from all paragraphs
      let story = '';
      const paragraphs = tempDiv.querySelectorAll('p');
      paragraphs.forEach(paragraph => {
          const decodedText = paragraph.textContent;
          story += decodedText + '\n\n';
      });

      // Wrap the story in <pre> tags to display as preformatted text
      const preformattedStory = `<pre>${story}</pre>`;
      document.querySelector('.biblicalVerse').innerHTML = preformattedStory;

      return story;
  } catch (error) {
      console.error('An error occurred:', error);
  }
}


// function getVerse(index) {
//   // const port = process.env.PORT || 8080;
//   //if you have problem displaying text change port
//   fetch(`/verse`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json', 
//     },
//     body: JSON.stringify({
//       verse:JSON.stringify(storiesArray[index].reference), 
//     }),
//   })
//   .then(response => response.json())
//   .then(result => {
//     document.querySelector('.biblicalVerse').innerHTML = result.message ;
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// }

