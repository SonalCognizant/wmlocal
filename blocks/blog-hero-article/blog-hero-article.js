// export default function decorate(block) {
//   const cols = [...block.firstElementChild.children];
//   block.classList.add(`columns-${cols.length}-cols`);

//   // setup image columns
//   [...block.children].forEach((row) => {
//     [...row.children].forEach((col) => {
//       const pic = col.querySelector('picture');
//       if (pic) {
//         const picWrapper = pic.closest('div');
//         if (picWrapper && picWrapper.children.length === 1) {
//           // picture is only content in column
//           picWrapper.classList.add('columns-img-col');
//         }
//       }
//     });
//   });
// }
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  // load footer as fragment
  const blogHeroMeta = getMetadata('blog-hero');
  console.log(blogHeroMeta);
  const blogHeroPath = blogHeroMeta
    ? new URL(blogHeroMeta, window.location).pathname
    : '/blog-hero';
  const fragment = await loadFragment(blogHeroPath);
  console.log(blogHeroPath);
  console.log(fragment);
  // decorate footer DOM
  block.textContent = '';
  const blogHero = document.createElement('div');
  block.append(blogHero);
}
