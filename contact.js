const handleContactFormSubmission = (event) => {
    event.preventDefault();
    const name = getValue("name");
    const surname = getValue("surname");
    const email = getValue("email");
    const subject = getValue("subject");
    const message = getValue("message");

    const contactInfo = {
        name,
        surname,
        email,
        subject,
        message,
    };

    fetch("https://flower-sell-website-drf-project.onrender.com/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactInfo),
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Failed to submit contact form");
            }
        })
        .then((data) => {
            alert("Your message has been sent successfully!");
            // Reset form fields after successful submission
            document.getElementById("contact-form").reset();
        })
        .catch((error) => {
            console.error("Error submitting contact form:", error);
            alert("Failed to send message. Please try again later.");
        });
};

const getValue = (id) => {
    return document.getElementById(id).value;
};

document.getElementById("contact-form").addEventListener("submit", handleContactFormSubmission);
