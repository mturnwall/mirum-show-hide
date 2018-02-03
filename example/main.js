import showHide from '../src/show_hide';

window.addEventListener('DOMContentLoaded', function loaded() {
    showHide({
        extraSel: '.extra',
    });
    window.removeEventListener('DOMContentLoaded', loaded);
});
