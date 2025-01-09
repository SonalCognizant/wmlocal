import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  // load footer as fragment
  // console.log(block);
  const blogHeroMeta = getMetadata('blog-hero');
  const blogHeroPath = blogHeroMeta
    ? new URL(blogHeroMeta, window.location).pathname
    : '/blog-hero';
  const fragment = await loadFragment(blogHeroPath);
  // console.log(fragment);
  const datafromArticleInformation = fragment.firstElementChild;
  const datafromImageContent = fragment.firstElementChild;
  console.log(datafromArticleInformation, datafromImageContent);
  const lastUpdatedDate = datafromArticleInformation.querySelector('.date');
  const articleReadTime = datafromArticleInformation.querySelector('.article-link').textContent;
  const imageSrc = datafromImageContent.querySelector('.columns-img-col p picture').innerHTML;
  const description = datafromImageContent.querySelector('.image-text').children[0].children[0].textContent;
  // console.log(lastUpdatedDate.lastChild.textContent, 'lastUpdatedDate');
  // console.log(articleReadTime, 'articleReadTime');
  // console.log(anchorscatoegory, 'acnhors');
  // console.log(imageSrc, description);
  block.textContent = '';
  const blogHero = document.createElement('div');
  const imgDiv = document.createElement('div');
  const contentDiv = document.createElement('div');
  // imgDiv.append(imageSrc);
  imgDiv.innerHTML = imageSrc;
  const headingDiv = document.createElement('div');
  const categoryDateDiv = document.createElement('div');
  const descriptionDiv = document.createElement('div');
  const descriptionPara = document.createElement('p');
  descriptionPara.append(description);
  descriptionDiv.append(descriptionPara);
  categoryDateDiv.append(lastUpdatedDate, articleReadTime);
  contentDiv.append(headingDiv, categoryDateDiv, descriptionDiv);
  blogHero.append(imgDiv, contentDiv);
  block.append(blogHero);
}
