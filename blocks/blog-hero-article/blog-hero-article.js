// import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const mainPageURL = block.textContent;
  const blogHeroPath = new URL(block.children[0].innerText).pathname;
  const fragment = await loadFragment(blogHeroPath);
  const mainHeading = fragment.children[0].textContent;
  const datafromArticleInformation = fragment.children[1].children[0];
  const datafromImageContent = fragment.children[1].children[1];
  const articleAnchors = datafromArticleInformation.querySelector('.article-link').children[1];
  const articlereadtime = datafromArticleInformation.querySelector('.article-link').children[0].textContent;
  const imageSrc = datafromImageContent.querySelector('.columns-img-col picture').innerHTML;
  const description = datafromImageContent.querySelector('.image-text').children[0].children[0].textContent;
  const blogHero = document.createElement('div');
  const imgDiv = document.createElement('div');
  imgDiv.classList.add('image-div');
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('content-div');
  const button = document.createElement('p');
  button.classList.add('button-container');
  const buttonanchor = document.createElement('a');
  buttonanchor.classList.add('button', 'primary');
  buttonanchor.setAttribute('href', `${mainPageURL}`);
  buttonanchor.innerText = 'Read more';
  button.append(buttonanchor);
  imgDiv.innerHTML = imageSrc;
  const categoryDateDiv = document.createElement('div');
  const descriptionDiv = document.createElement('div');
  const descriptionPara = document.createElement('p');
  const heading = document.createElement('h2');
  heading.append(mainHeading);
  descriptionPara.append(description);
  descriptionDiv.append(descriptionPara);
  descriptionDiv.classList.add('description');
  const lastUpdatedpara = document.createElement('p');
  // const lastUpdatedDate = datafromArticleInformation.querySelector('.date');
  // console.log(lastUpdatedDate);
  // const lastUpdatedDateallpara = lastUpdatedDate.querySelectorAll('p');
  // console.log(lastUpdatedDateallpara);
  // const spanDate = lastUpdatedDateallpara.querySelector('span');
  // console.log(spanDate);
  if (datafromArticleInformation.querySelector('.date').lastChild !== undefined && datafromArticleInformation.querySelector('.date').lastChild !== null) {
    const lastUpdatedDate = datafromArticleInformation.querySelector('.date').lastChild;
    if (lastUpdatedDate.querySelector('span') !== null && lastUpdatedDate.querySelector('span') !== undefined) {
      const spanDate = lastUpdatedDate.querySelector('span');
      const modifiedDate = spanDate.textContent;
      const span = document.createElement('span');
      span.append(modifiedDate);
      lastUpdatedpara.append(span, articlereadtime);
    }
  }
  categoryDateDiv.append(lastUpdatedpara, articleAnchors);
  contentDiv.append(heading, categoryDateDiv, descriptionDiv, button);
  blogHero.append(imgDiv, contentDiv);
  block.innerHTML = '';
  block.append(blogHero);
}
