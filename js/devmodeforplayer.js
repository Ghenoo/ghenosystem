function devMode2() {
    if (!isLocalhost2()) {
        sagTikEngel2();
        konsolkapat2();
        document.title = "Player";
    }
    else {
        console.log("Welcome, He Who Remains.");
        document.title = "Player (Dev Mode)";
    }
}

function isLocalhost2() {
    return window.location.hostname === "localhost";
}

function sagTikEngel2() {
    document.addEventListener("contextmenu", function (dilosurucu) {
        dilosurucu.preventDefault();
    });
}

function konsolkapat2() {
    DisableDevtool({
        ondevtoolopen(type, next) {
            next();
            alert("You think you're too smart, don't you?");
        }
    });
}

devMode2();
