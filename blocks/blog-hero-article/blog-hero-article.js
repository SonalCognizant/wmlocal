import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const pageURL = block.innerContent;
  console.log(pageURL);
  const blogHeroMeta = getMetadata('blog-hero');
  const blogHeroPath = blogHeroMeta
    ? new URL(blogHeroMeta, window.location).pathname
    : '/blog-hero';
  const fragment = await loadFragment(blogHeroPath);
  const mainHeading = fragment.children[0].textContent;
  const datafromArticleInformation = fragment.children[1].children[0];
  const datafromImageContent = fragment.children[1].children[1];
  const lastUpdatedDate = datafromArticleInformation.querySelector('.date p span');
  const articleReadTime = datafromArticleInformation.querySelector('.article-link').children[1];
  const imageSrc = datafromImageContent.querySelector('.columns-img-col p picture').innerHTML;
  const description = datafromImageContent.querySelector('.image-text').children[0].children[0].textContent;
  block.textContent = '';
  const blogHero = document.createElement('div');
  const imgDiv = document.createElement('div');
  const contentDiv = document.createElement('div');
  imgDiv.innerHTML = imageSrc;
  const categoryDateDiv = document.createElement('div');
  const descriptionDiv = document.createElement('div');
  const descriptionPara = document.createElement('p');
  const heading = document.createElement('h2');
  heading.append(mainHeading);
  descriptionPara.append(description);
  descriptionDiv.append(descriptionPara);
  const lastUpdatedpara = document.createElement('p');
  lastUpdatedpara.append(lastUpdatedDate.innerText);
  // if (lastUpdatedDate.children[1] !== 'undefined' && lastUpdatedDate !== 'undefined') {
  //   lastUpdatedpara.append(lastUpdatedDate?.children[1]?.innerText);
  // } else {
  //   lastUpdatedDate = 'MM/DD/YYYY';
  // }
  categoryDateDiv.append(lastUpdatedpara, articleReadTime);
  contentDiv.append(heading, categoryDateDiv, descriptionDiv);
  blogHero.append(imgDiv, contentDiv);
  block.append(blogHero);
}
