const loadflower = (search) => {
  document.getElementById("flowers").innerHTML = "";
  document.getElementById("spinner").style.display = "block";

  fetch(`https://flower-sell-website-drf-project.onrender.com/flower/list/?search=${search ? search : ""}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "none";
        displyflowers(data);
      } else {
        document.getElementById("flowers").innerHTML = ""; // Clear previous flower data
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "block";
      }
    });
};

const truncateWords = (text, numWords) => {
    const words = text.split(' ');
    if (words.length > numWords) {
      return words.slice(0, numWords).join(' ') + '...';
    }
    return text;
  };

  const displyflowers = (flowerss) => {
    const parent = document.getElementById("flowers");
    parent.innerHTML = ""; // Clear previous content
  
    flowerss?.forEach((flower) => {
      const div = document.createElement("div");
      div.classList.add("col-lg-3", "col-sm-6", "col-xs-12");
  
      div.innerHTML = `
        <div class="item">
          <div class="thumb">
            <img src="${flower.image}" alt="${flower.title}">
          </div>
          <div class="down-content">
            <h4>${flower.title}</h4>
            <p>${truncateWords(flower.details, 20)}</p>
            <p>
              ${flower.categories.map((category) => {
                return `<button class="bt">${category}</button>`;
              }).join("")}
            </p>
            <div class="main-button mb-2">
              <a target="_blank" href="flowerDetails.html?flowerId=${flower.id}">Details</a>
            </div>
          </div>
        </div>
      `;
  
      parent.appendChild(div);
    });
  };
  

const handleSearch = () => {
    const value = document.getElementById("searchflw").value;
    loadflower(value);
  };

  const loadCategory = () => {
    fetch("https://flower-sell-website-drf-project.onrender.com/flower/categories/")
      .then((res) => res.json())
      .then((data) => {
       
        data.forEach((item) => {
           
          const parent = document.getElementById("drop-cat");
          const li = document.createElement("li");
          li.classList.add("dropdown-item");
          li.innerHTML = `
        <li onclick="loadflower('${item.name}')"> <a class="ct">${item.name}</a></li>
          `;
          console.log(item.name)
          parent.appendChild(li);
         
        });
      });
  };

loadflower();
loadCategory();