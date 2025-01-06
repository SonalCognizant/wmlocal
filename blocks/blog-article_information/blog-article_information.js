export default function decorate(block) {
    // Create a container for the block
    const container = document.createElement('div');
    container.classList.add('custom-block');
  
    // Create the left section for dates
    const leftSection = document.createElement('div');
    leftSection.classList.add('left-section');
  
    // Create elements for last modified and last published dates
    const lastModifiedDate = document.createElement('p');
    lastModifiedDate.textContent = `Last Modified: ${block.dataset.lastModified || 'N/A'}`;
  
    const lastPublishedDate = document.createElement('p');
    lastPublishedDate.textContent = `Last Published: ${block.dataset.lastPublished || 'N/A'}`;
  
    // Append dates to the left section
    leftSection.appendChild(lastModifiedDate);
    leftSection.appendChild(lastPublishedDate);
  
    // Create the right section for the author's name
    const rightSection = document.createElement('div');
    rightSection.classList.add('right-section');
  
    const authorName = document.createElement('p');
    authorName.textContent = `Author: ${block.dataset.author || 'Unknown'}`;
  
    // Append author name to the right section
    rightSection.appendChild(authorName);
  
    // Create a section for reading articles
    const readingArticlesSection = document.createElement('div');
    readingArticlesSection.classList.add('reading-articles');
  
    const readingArticles = document.createElement('p');
    readingArticles.textContent = `Reading Articles: ${block.dataset.articles || 'No articles available'}`;
  
    // Append reading articles to the section
    readingArticlesSection.appendChild(readingArticles);
  
    // Create a section for the audio link
    const audioSection = document.createElement('div');
    audioSection.classList.add('audio-section');
  
    const audioLink = document.createElement('a');
    audioLink.href = block.dataset.audioLink || '#';
    audioLink.textContent = 'Listen to Audio';
    audioLink.target = '_blank';
  
    // Append audio link to the section
    audioSection.appendChild(audioLink);
  
    // Append all sections to the container
    container.appendChild(leftSection);
    container.appendChild(rightSection);
    container.appendChild(readingArticlesSection);
    container.appendChild(audioSection);
  
    // Clear the block and append the container
    block.textContent = '';
    block.appendChild(container);
  }