let storiesArray;
let main_text = '';
async function fetchData() {
  try {
      const response = await fetch('stories.json');
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
    main_text += 
    `<div class="stories" onclick = openPopup()>` +
      `<img class = poster src="image.png" alt="404 image not found" onclick = showStory(${i})>` +
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
  console.log(storiesArray); // Log the array to the console
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
let categories_text = '';

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
  for (var i = 0; i < storiesArray.length; i++) {
    // Check each category of the story
    for (var j = 0; j < storiesArray[i].metadata.categories.length; j++) {
        if(storiesArray[i].metadata.categories[j] === category) {
            main_text += 
            `<div class="stories" >` +
                `<img class = poster src="image.png" alt="404 image not found">` +
                `<div class="title">` +
                    `<p>${storiesArray[i].title}</p>` +
                `</div>
            </div>`;
            // Break the loop after finding a match
            
        }
    }
}

  console.log(main_text);
  document.querySelector("main").innerHTML = main_text;
}

function showStory(index)
{
  
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
  console.log("Popup opened");
    popup.style.display = "block";
}