
window.onload = () => {
    hideAllGames();
}

function startJoulupeli2020() {
    hideElement("#joulupeli2020 input");
    showElement("#unityContainer2020");
    UnityLoader.instantiate("unityContainer2020", "Joulupeli2020/WebGL.json");
}

function startJoulupeli2021() {
    hideElement("#joulupeli2021 input");
    showElement("#unity-canvas-joulupeli2021");
    createUnityInstance(document.querySelector("#unity-canvas-joulupeli2021"), {
        dataUrl: "Joulupeli2021/WebGL.data.unityweb",
        frameworkUrl: "Joulupeli2021/WebGL.framework.js.unityweb",
        codeUrl: "Joulupeli2021/WebGL.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "KallioStudios",
        productName: "Joulupeli-2021",
        productVersion: "0.1",
        // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
        // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
    });
}

function hideAllGames() {
    hideJoulupeli2020();
    hideJoulupeli2021();
}

function hideJoulupeli2021() {
    hideElement("#unity-canvas-joulupeli2021");
    showElement("#joulupeli2021 input");
}

function hideJoulupeli2020() {
    hideElement("#unityContainer2020");
    showElement("#joulupeli2020 input");
}

function showElement(selector) {
    setElementDisplay(selector, "initial");
}

function hideElement(selector) {
    setElementDisplay(selector, "none");
}

function setElementDisplay(selector, displayValue) {
    document.querySelector(selector).style.display = displayValue;
}
