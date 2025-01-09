import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  // load footer as fragment
  const blogHeroMeta = getMetadata('blog-hero');
  const blogHeroPath = blogHeroMeta
    ? new URL(blogHeroMeta, window.location).pathname
    : '/blog-hero';
  const fragment = await loadFragment(blogHeroPath);
  const datafromArticleInformation = fragment.firstElementChild.children[0];
  const datafromImageContent = fragment.firstElementChild.children[1];
  console.log(datafromArticleInformation, datafromImageContent);
  const lastUpdatedDate = datafromArticleInformation.querySelector('.date ');
  const articleReadTime = datafromArticleInformation.querySelector('.article-link');
  const anchorscatoegory = datafromArticleInformation.querySelectorAll('.article-link p').innerHTML;
  const imageSrc = datafromImageContent.querySelector('.columns-img-col p picture').innerHTML;
  const description = datafromImageContent.querySelector('.image-text').children[0].children[0].innerText;
  console.log(lastUpdatedDate.children[1].innerText, 'lastUpdatedDate');
  console.log(articleReadTime.innerText, 'articleReadTime');
  console.log(anchorscatoegory, 'acnhors');
  console.log(imageSrc, description);
  block.textContent = '';
  const blogHero = document.createElement('div');
  block.append(blogHero);
}
