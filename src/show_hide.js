import toggleHeight from './toggleHeight';

export default function ({
    extraSel = '.extra',
    buttonSel = '.read-more',
    height = null,
} = {}) {
    const extra = document.querySelector(extraSel);
    const button = document.querySelector(buttonSel);
    const startingHeight = height || extra.offsetHeight;
    button.addEventListener('click', function (evt) {
        evt.preventDefault();
        toggleHeight(startingHeight, extra);
    });
}
