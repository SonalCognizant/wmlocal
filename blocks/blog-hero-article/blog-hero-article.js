import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const mainPageURL = block.textContent;
  const blogHeroMeta = getMetadata('blog-hero');
  const blogHeroPath = blogHeroMeta
    ? new URL(blogHeroMeta, window.location).pathname
    : '/blog-hero';
  const fragment = await loadFragment(blogHeroPath);
  const mainHeading = fragment.children[0].textContent;
  const datafromArticleInformation = fragment.children[1].children[0];
  const datafromImageContent = fragment.children[1].children[1];
  const articleAnchors = datafromArticleInformation.querySelector('.article-link').children[1];
  const articlereadtime = datafromArticleInformation.querySelector('.article-link').children[0].textContent;
  const imageSrc = datafromImageContent.querySelector('.columns-img-col p picture').innerHTML;
  const description = datafromImageContent.querySelector('.image-text').children[0].children[0].textContent;
  block.innerHTML = '';
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
  const lastUpdatedpara = document.createElement('p');
  // const lastUpdatedDate = datafromArticleInformation.querySelector('.date');
  // const lastUpdatedDateallpara = lastUpdatedDate.querySelectorAll('p')[1];
  // const spanDate = lastUpdatedDateallpara.querySelector('span');
  // const modifiedDate = spanDate.textContent;
  lastUpdatedpara.append(articlereadtime);
  categoryDateDiv.append(lastUpdatedpara, articleAnchors);
  contentDiv.append(heading, categoryDateDiv, descriptionDiv, button);
  blogHero.append(imgDiv, contentDiv);
  block.append(blogHero);
}
