export default function decorate(block) {
  block.children[1].classList.add("contact-div");
  block.children[2].classList.add("adobe-div");
  block.children[3].classList.add("language-div");
  const attentionDiv = block.children[4].classList.add("attention-div");
  block.children[5].classList.add("copyright-div");
  const logoImg = document.createElement("img");
  logoImg.src = "../../images/global/WellmarkLogo.png";
  logoImg.className = "logo-img";
  const logoDiv = block.children[0];
  const imgDiv = document.createElement("div");
  imgDiv.append(logoImg);
  logoDiv.prepend(imgDiv);
  logoDiv.classList.add("logo-social-div");
  const socialDiv = block.children[0].children[1];
  const linkImg1 = document.createElement("img");
  const linkImg2 = document.createElement("img");
  const linkImg3 = document.createElement("img");
  const linkImg4 = document.createElement("img");
  const linkImg5 = document.createElement("img");
  const anchor1 = document.createElement("a");
  const anchor2 = document.createElement("a");
  const anchor3 = document.createElement("a");
  const anchor4 = document.createElement("a");
  const anchor5 = document.createElement("a");
  anchor1.setAttribute("href", "#");
  anchor2.setAttribute("href", "#");
  anchor3.setAttribute("href", "#");
  anchor4.setAttribute("href", "#");
  anchor5.setAttribute("href", "#");
  linkImg1.setAttribute("data-icon-name", "right-arrow");
  linkImg1.src = "/icons/facebook.svg";
  linkImg1.setAttribute("loading", "eager");
  linkImg1.className = "link-img";

  linkImg2.src = "/icons/x.svg";
  linkImg2.setAttribute("data-icon-name", "right-arrow");
  linkImg2.setAttribute("loading", "eager");
  linkImg2.className = "link-img";

  linkImg3.src = "/icons/youtube.svg";
  linkImg3.setAttribute("data-icon-name", "right-arrow");
  linkImg3.setAttribute("loading", "eager");
  linkImg3.className = "link-img";

  linkImg4.src = "/icons/instagram.svg";
  linkImg4.setAttribute("data-icon-name", "right-arrow");
  linkImg4.setAttribute("loading", "eager");
  linkImg4.className = "link-img";

  linkImg5.src = "/icons/linkedin.svg";
  linkImg5.setAttribute("data-icon-name", "right-arrow");
  linkImg5.setAttribute("loading", "eager");
  linkImg5.className = "link-img";

  anchor1.append(linkImg1);
  anchor2.append(linkImg2);
  anchor3.append(linkImg3);
  anchor4.append(linkImg4);
  anchor5.append(linkImg5);
  socialDiv.classList.add("social-div");
  socialDiv.append(anchor1, anchor2, anchor3, anchor4, anchor5);
  const socialDiv2=document.createElement('div')
  socialDiv2.append(anchor1, anchor2, anchor3, anchor4, anchor5);
  console.log(socialDiv2,"socialDiv2")
  // const socialDiv2 = block.children[4].children[0]
  // console.log(socialDiv2);
  // socialDiv2.append(anchor1, anchor2, anchor3, anchor4, anchor5);
  // attentionDiv.append(socialDiv2);
  // if (window.innerWidth <= 1023) {
  //   attentionDiv.append(socialDiv2);
  // } else {
  //   socialDiv.append(anchor1, anchor2, anchor3, anchor4, anchor5);
  // }
}
