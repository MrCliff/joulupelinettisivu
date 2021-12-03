
window.onload = () => {
    hideAllGames();
    loadVersions();
}

function loadVersions() {
    loadVersion("#joulupeli2021 .version", "Joulupeli2021/version.txt");
    loadVersion("#joulupeli2020 .version", "Joulupeli2020/version.txt");
}

function loadVersion(elementSelector, versionFilePath) {
    let versionElement = document.querySelector(elementSelector);
    if (!versionElement) {
        throw new Error(`Couldn't find version element with selector: ${elementSelector}`);
    }
    fetch(versionFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Couldn't fetch version. Status: ${response.status}, ${response.statusText}`);
            }
            return response.text();
        })
        .then(response => {
            let version = response.trim();
            versionElement.innerText = "v" + (version.length > 0 ? version : "0");
        });
}

function startJoulupeli2020() {
    hideElement("#joulupeli2020 input");
    showElement("#unityContainer2020");
    let unity = UnityLoader.instantiate("unityContainer2020", "Joulupeli2020/WebGL.json");
    unity.Module.deinitializers.push(e => hideJoulupeli2020());
}

function startJoulupeli2021() {
    hideElement("#joulupeli2021 input");
    let canvas = showElement("#unity-canvas-joulupeli2021");
    if (!canvas) {
        canvas = createCanvas("#joulupeli2021 > .game-container", "unity-canvas-joulupeli2021");
    }
    createUnityInstance(canvas, {
        dataUrl: "Joulupeli2021/WebGL.data.unityweb",
        frameworkUrl: "Joulupeli2021/WebGL.framework.js.unityweb",
        codeUrl: "Joulupeli2021/WebGL.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "KallioStudios",
        productName: "Joulupeli-2021",
        productVersion: "0.1",
        // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
        // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
    }).then(unityInstance => {
        unityInstance.Module.deinitializers.push(e => hideJoulupeli2021());
    });
}

function createCanvas(parentSelector, id) {
    let canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.className = "unity-canvas";
    document.querySelector(parentSelector).appendChild(canvas);
    return canvas;
}

function removeElement(id) {
    let element = document.getElementById(id);
    if (element) {
        element.parentElement.removeChild(element);
    }
}

function hideAllGames() {
    hideJoulupeli2020();
    hideJoulupeli2021();
}

function hideJoulupeli2021() {
    removeElement("unity-canvas-joulupeli2021");
    showElement("#joulupeli2021 input");
}

function hideJoulupeli2020() {
    hideElement("#unityContainer2020");
    showElement("#joulupeli2020 input");
}

function showElement(selector) {
    return setElementDisplay(selector, "initial");
}

function hideElement(selector) {
    return setElementDisplay(selector, "none");
}

function setElementDisplay(selector, displayValue) {
    let elem = document.querySelector(selector);
    if (elem) {
        elem.style.display = displayValue;
    }
    return elem;
}
