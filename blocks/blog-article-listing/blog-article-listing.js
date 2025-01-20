// import { getMetadata } from '../../scripts/aem.js';
// import { loadFragment } from '../fragment/fragment.js';

const myJson = [
  {
    publishDate: '10/02/1999',
    ImageUrl: 'https://asesstttxyzamjdandjamdkam.com',
    title: 'Type something',
    category: ['category one', 'category two', 'category three'],
    articleReadTime: '5 min read',
    id: 1,
    articleUrl: 'https://abcd.com',
  },
  {
    publishedDate: '10/02/1999',
    ImageUrl: 'https://asesstttxyzamjdandjamdkam.com',
    title: 'Type something',
    category: ['category one', 'category two', 'category three'],
    articleReadTime: '5 min read',
    id: 2,
    articleUrl: 'https://abcd.com',
  },
  {
    publishedDate: '10/02/1999',
    ImageUrl: 'https://asesstttxyzamjdandjamdkam.com',
    title: 'Type something',
    category: ['category one', 'category two', 'category three'],
    articleReadTime: '5 min read',
    id: 3,
    articleUrl: 'https://abcd.com',
  },
  {
    publishedDate: '10/02/1999',
    ImageUrl: 'https://asesstttxyzamjdandjamdkam.com',
    title: 'Type something',
    category: ['category one', 'category two', 'category three'],
    articleReadTime: '5 min read',
    id: 4,
    articleUrl: 'https://abcd.com',
  },
  {
    publishedDate: '10/02/1999',
    ImageUrl: 'https://asesstttxyzamjdandjamdkam.com',
    title: 'Type something',
    category: ['category one', 'category two', 'category three'],
    articleReadTime: '5 min read',
    id: 5,
    articleUrl: 'https://abcd.com',
  },
  {
    publishedDate: '10/02/1999',
    ImageUrl: 'https://asesstttxyzamjdandjamdkam.com',
    title: 'Type something',
    category: ['category one', 'category two', 'category three'],
    articleReadTime: '5 min read',
    id: 6,
    articleUrl: 'https://abcd.com',
  },
  {
    publishedDate: '10/02/1999',
    ImageUrl: 'https://asesstttxyzamjdandjamdkam.com',
    title: 'Type something',
    category: ['category one', 'category two', 'category three'],
    articleReadTime: '5 min read',
    id: 7,
    articleUrl: 'https://abcd.com',
  },
  {
    publishedDate: '10/02/1999',
    ImageUrl: 'https://asesstttxyzamjdandjamdkam.com',
    title: 'Type something',
    category: ['category one', 'category two', 'category three'],
    articleReadTime: '5 min read',
    id: 9,
    articleUrl: 'https://abcd.com',
  },
  {
    publishedDate: '10/02/1999',
    ImageUrl: 'https://asesstttxyzamjdandjamdkam.com',
    title: 'Type something',
    category: ['category one', 'category two', 'category three'],
    articleReadTime: '5 min read',
    id: 10,
    articleUrl: 'https://abcd.com',
  },
];
export default async function decorate(block) {
  const heading = block.children[0].children[0].innerText;
  console.log(heading);
  const inlinewithIcon = block.children[0].children[1].innerHTML;
  console.log(inlinewithIcon);
  // eslint-disable-next-line object-curly-newline
  myJson.forEach(({ ImageUrl, category, publishDate, articleReadTime, title }) => {
    const imageURL = ImageUrl;
    const categoryList = category;
    const publishedDate = publishDate;
    const articleTime = articleReadTime;
    const titleofCard = title;
    const mainDiv = document.createElement('div');
    const contentDiv = document.createElement('div');
    const image = document.createElement('img');
    image.src = `${imageURL}`;
    image.alt = 'thumbnail';
    const allCategory = categoryList.forEach((item) => {
      const value = { item };
      const anchors = document.createElement('a');
      anchors.href = 'www.google.com';
      anchors.append(value);
      return anchors;
    });
    console.log(allCategory);
    const pubDate = document.createElement('p');
    pubDate.append(publishedDate);
    const arcretime = document.createElement('p');
    arcretime.append(articleTime);
    const mainTitle = document.createElement('h3');
    mainTitle.append(titleofCard);
    contentDiv.append(mainTitle, pubDate, arcretime, allCategory);
    mainDiv.append(image, contentDiv);
    block.innerHTML = '';
    block.append(mainDiv);
  });
}
