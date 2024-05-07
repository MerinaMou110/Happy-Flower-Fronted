const loadAllFlower = () => {
    const user_id = localStorage.getItem("user_id");
    fetch(
      `https://flower-sell-website-drf-project.onrender.com/order/order-history/?user_id=${user_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const parent = document.getElementById("table-body");
        data.forEach((item) => {
            fetch(`https://flower-sell-website-drf-project.onrender.com/flower/list/${item.flower}/`)
            .then(response => response.json())
            .then(flowerData => {
              const tr = document.createElement("tr");
              tr.innerHTML = `
                <td>${item.flower}</td>
                <td>${flowerData.title}</td>
                <td><img src="${flowerData.image}" alt="${flowerData.name}" style="width: 50px;"></td>
                <td> 
                <button class="${item.status === 'Pending' ? 'btn-danger' : 'btn-success'}">${item.status}</button> 
              </td>
              `;
              parent.appendChild(tr);
            })
            .catch(error => {
              console.error('Error fetching flower details:', error);
            });
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };
  
  loadAllFlower();
  