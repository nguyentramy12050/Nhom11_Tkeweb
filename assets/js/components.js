function loadHtmlComponent(targetId, url, callback) {
    const target = document.getElementById(targetId);
    if (!target) return;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Khong tai duoc component: ${url}`);
            }

            return response.text();
        })
        .then(html => {
            target.innerHTML = html;

            target.querySelectorAll("script").forEach(oldScript => {
                const script = document.createElement("script");

                if (oldScript.src) {
                    script.src = oldScript.src;
                } else {
                    script.textContent = oldScript.textContent;
                }

                document.body.appendChild(script);
                oldScript.remove();
            });

            if (typeof callback === "function") callback();
        })
        .catch(error => {
            console.error(error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    loadHtmlComponent("header-placeholder", "components/header.html", function () {
        if (typeof window.initThuhienHeader === "function") {
            window.initThuhienHeader();
        }
    });

    loadHtmlComponent("footer-placeholder", "components/footer.html");
});
