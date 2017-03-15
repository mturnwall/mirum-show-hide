import expand from '../src/show_hide';

window.addEventListener('DOMContentLoaded', function loaded() {
    expand();
    window.removeEventListener('DOMConentLoaded', loaded);
});
