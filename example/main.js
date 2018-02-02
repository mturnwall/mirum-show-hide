import expand from '../src/show_hide';

window.addEventListener('DOMContentLoaded', function loaded() {
    expand({
        extraSel: '.extra1',
    });
    window.removeEventListener('DOMConentLoaded', loaded);
});
