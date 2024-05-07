const getparams = () => {
    document.getElementById("flw-details").innerHTML = "";
    const param = new URLSearchParams(window.location.search).get("flowerId");
    fetch(`https://flower-sell-website-drf-project.onrender.com/flower/list/${param}`)
      .then((res) => res.json())
      .then((data) => displayDetails(data));
};

const displayDetails = (flower) => {
    const parent = document.getElementById("flw-details");
    const div = document.createElement("div");
    div.classList.add("flw-details-container");
    div.innerHTML = `
        <div class="col-md-6">
            <div class="thumb">
                <img  src="${flower.image}" alt="" />
            </div>
        </div>
        <div class="col-md-6">
            <div class="flw-info">
                <h1>${flower.title}</h1>
                <h3>Price: ${flower.price}</h3>
                <h3>Quantity: ${flower.quantity}</h3>
                <p>${flower.details}</p>
                <p>${flower.categories.map((item) => {
                    return `<button class="bt">${item}</button>`;
                })}</p> 
                <button id="orderBtn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Order
                </button>
            </div>
        </div>
    `;
    parent.appendChild(div);

    // Add event listener to the order button
    const orderBtn = document.getElementById("orderBtn");
    if (orderBtn) {
        orderBtn.addEventListener("click", () => {
            placeOrder(flower.id); // Call placeOrder function when the button is clicked
        });
    } else {
        console.error("Order button not found in DOM");
    }
};


const placeOrder = (flowerId) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("User is not authenticated. Please log in.");
        return;
    }
    fetch("https://flower-sell-website-drf-project.onrender.com/order/order-flower/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ flower_id: flowerId }),
    })
    .then((response) => {
        if (response.ok) {
            alert("Order placed successfully");
            getparams(); // Refresh the flower details after the order is placed
        } else {
            alert("Error placing order:", response.statusText);
        }
    })
    .catch((error) => {
        console.error("Error placing order:", error);
    });
};

getparams();
