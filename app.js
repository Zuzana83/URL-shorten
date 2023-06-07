const shortForm = document.querySelector(".shorter-form");
const linkInput = document.querySelector("#link-input");
const linksContainer = document.querySelector(".links-container");
const errorMsg = document.querySelector(".error-msg");

const baseURL = "https://api.shrtco.de/v2/shorten?url=";

const copyToClipboard = (e) => {
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    const shortUrl = e.currentTarget.previousElementSibling;
    navigator.clipboard.writeText(shortUrl.textContent);

    e.target.textContent = "copied!";
    e.target.style.backgroundColor = "#3a3053";

    setTimeout(() => {
        e.target.textContent = "copy it!";
        e.target.style.backgroundColor = "#29d1d2";
    }, 2000);
}

function displayLinkList(linkData) {
    const {full_short_link} = linkData.result;
    const orgLink = linkInput.value;
    linksContainer.innerHTML += `<li class="link-item">
        <p>${orgLink}</p>
        <div class="shorter-version">
            <p>${full_short_link}</p>
            <button type="button" onclick="copyToClipboard(event)" class="btn btn-link">copy it!</button>
        </div>
    </li> `; 
}

async function getShortLink(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    displayLinkList(data);
}

function shortenLink(e) {
    e.preventDefault();

    if(!linkInput.value) {
        console.log("Please enter value");
        errorMsg.classList.add("show");
        linkInput.classList.add("error");
        
        setTimeout(() => {
            errorMsg.classList.remove("show");
            linkInput.classList.remove("error");
        }, 2000);
        
        linkInput.focus();
        return;
    }

    const link = linkInput.value.trim();

    const linkURL = `${baseURL}${link}`;

    getShortLink(linkURL);

    setTimeout(() => {
        shortForm.reset();
    }, 300); 
}

// getShortLink(baseURL);
shortForm.addEventListener("submit", shortenLink);