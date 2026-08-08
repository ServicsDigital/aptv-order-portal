const prices = {
    "1 Month": {
        "1 Device": 20,
        "2 Devices": 25,
        "3 Devices": 30,
        "4 Devices": 35,
        "5 Devices": 40
    },

    "3 Months": {
        "1 Device": 40,
        "2 Devices": 50,
        "3 Devices": 60,
        "4 Devices": 70,
        "5 Devices": 80
    },

    "6 Months": {
        "1 Device": 70,
        "2 Devices": 90,
        "3 Devices": 110,
        "4 Devices": 130,
        "5 Devices": 150
    },

    "12 Months": {
        "1 Device": 130,
        "2 Devices": 170,
        "3 Devices": 200,
        "4 Devices": 240,
        "5 Devices": 250
    }
};

const planInput = document.getElementById("plan");
const devicesInput = document.getElementById("devices");
const priceDisplay = document.getElementById("price");

const summaryPlan = document.getElementById("summary-plan");
const summaryDevices = document.getElementById("summary-devices");
const summaryTotal = document.getElementById("summary-total");
const totalPriceInput = document.getElementById("total-price");
const planButtons = document.querySelectorAll("[data-plan]");
const deviceButtons = document.querySelectorAll("[data-device]");
const paymentInput = document.getElementById("payment");
const paymentButtons = document.querySelectorAll("[data-payment]");

function updateDevicePrices() {
    const selectedPlan = planInput.value;

    deviceButtons.forEach(button => {
        const device = button.dataset.device;
        const price = selectedPlan && prices[selectedPlan]
            ? prices[selectedPlan][device]
            : null;

        let priceText = button.querySelector(".device-price");

        if (!priceText) {
            priceText = document.createElement("span");
            priceText.className = "device-price";
            button.appendChild(priceText);
        }

        priceText.textContent = price !== null
            ? "$" + price.toFixed(2)
            : "Select plan";
    });
}


function updatePrice() {
    const plan = planInput.value;
    const devices = devicesInput.value;

    let total = 0;

    if (
        plan &&
        devices &&
        prices[plan] &&
        prices[plan][devices] !== undefined
    ) {
        total = prices[plan][devices];

        priceDisplay.textContent = "$" + total.toFixed(2);
    } else {
        priceDisplay.textContent = "$0.00";
    }

   summaryPlan.textContent = plan || "Not selected";
summaryDevices.textContent = devices || "Not selected";
summaryTotal.textContent = priceDisplay.textContent;

totalPriceInput.value = priceDisplay.textContent;

updateDevicePrices();
}


planButtons.forEach(button => {
    button.addEventListener("click", () => {

        planButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        planInput.value = button.dataset.plan;

        devicesInput.value = "";

        deviceButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        updatePrice();
    });
});


deviceButtons.forEach(button => {
    button.addEventListener("click", () => {

        if (!planInput.value) {
            alert("Please select a subscription plan first.");
            return;
        }

        deviceButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        devicesInput.value = button.dataset.device;

        updatePrice();
    });
});
paymentButtons.forEach(button => {
    button.addEventListener("click", () => {

        paymentButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        paymentInput.value = button.dataset.payment;
    });
});



const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!paymentInput.value) {
        alert("Please select a payment method before submitting your order.");
        return;
    }

    if (!planInput.value || !devicesInput.value) {
        alert("Please select your subscription and number of devices.");
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting Order...";
    }

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            window.location.href = "thank-you.html";
        } else {
            alert("There was a problem submitting your order. Please try again.");

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Order";
            }
        }

    } catch (error) {
        alert("There was a problem submitting your order. Please check your connection and try again.");

        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Submit Order";
        }
    }
});
    
;


updateDevicePrices();
updatePrice();