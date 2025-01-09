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
  const lastUpdatedDate = datafromArticleInformation.children.children[0].children[0]
    .children[1].innerText;
  console.log(lastUpdatedDate);
  block.textContent = '';
  const blogHero = document.createElement('div');
  block.append(blogHero);
}
