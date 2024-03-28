

async function getVerse(verse) {
    try {
        const response = await fetch(`http://labs.bible.org/api/?passage=${verse}&formatting=full`);
        
        // // // console.log(response);

        if (!response.ok) {
            throw new Error('Error');
        }

        const htmlString = await response.text();
        // console.log(htmlString);

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
        console.log(story);
        return story;
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

let story =  getVerse('Luke 23:26-49').then(story =>
    {
       document.querySelector("div").innerHTML = story;
    });