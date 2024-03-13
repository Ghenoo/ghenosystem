function devMode1() {
    if (!isLocalhost1()) {
        sagTikEngel1();
        konsolkapat1();
        document.title = "Dev-link Gheno";
    }
    else {
        alert("You are in development mode. You can't disable dev mode on localhost.");
        console.log("Welcome, He Who Remains.");
        document.title = "looser (Dev)";
    }
}

function isLocalhost1() {
    return window.location.hostname === "localhost";
}

function sagTikEngel1() {
    document.addEventListener("contextmenu", function (dilosurucu) {
        dilosurucu.preventDefault();
    });
}

function konsolkapat1() {
    DisableDevtool({
        ondevtoolopen(type, next) {
            next();
            alert("You think you're too smart, don't you?");
        }
    });
}

devMode1();
