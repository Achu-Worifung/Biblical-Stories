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
    `<div class="stories">` +
      `<img class = poster src="image.png" alt="404 image not found">` +
      `<div class="title">` +
        `<p>${stories[i].title}</p>` +
      `</div>
    </div>`;
  }
  console.log(main_text);
  document.querySelector("main") .innerHTML = main_text;
}

async function execute() {
  await fetchData(); // Wait until fetchData() is done
  console.log(storiesArray); // Log the array to the console
  displayStories(storiesArray); // Call displayStories() after fetchData() is done
}

execute();
