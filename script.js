
const form = document.getElementById("contactForm");
const status = document.getElementById("status");

const scriptURL = "https://script.google.com/macros/s/AKfycbz9b0LT0XqF5YTj-Ns3LD1kp3oVoZH0tTjo2kxaRQGwC7hQiq4NaVU3a2k3k89_YwS1/exec";

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (
    scriptURL === "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL" ||
    !scriptURL.endsWith("/exec")
  ) {
    status.textContent = "Please add your Google Apps Script URL.";
    return;
  }

  const data = Object.fromEntries(
    new FormData(form).entries()
  );

  status.textContent = "Submitting your enquiry...";
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(data)
    });

    status.textContent =
      "Request sent. Please check the Google Sheet to confirm your enquiry was saved.";

    form.reset();
  } catch (error) {
    status.textContent =
      "Unable to send the enquiry. Please check your internet connection and try again.";
  } finally {
    submitButton.disabled = false;
  }
});
