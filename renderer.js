// renderer.js
const { ipcRenderer } = require('electron');

function openNewWindow(id) {
  ipcRenderer.send('open-new-window', id);
}




