export default function decorate(block) {
  const footerMain= block.children[1].classList.add("contact-div");
  const logoImg = document.createElement("img");
  logoImg.src = '../../images/global/WellmarkLogo.png';
  logoImg.className = 'logo-img';
  const logoDiv = block.children[0];
  const imgDiv = document.createElement("div");
  // imgDiv.append(logoImg)
  // logoDiv.append(logoDiv);
  console.log(logoDiv);
  console.log(imgDiv);
  console.log(logoImg);
}
