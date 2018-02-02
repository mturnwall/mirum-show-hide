import toggleHeight from './toggleHeight';

export default function ({
    extraSel = '.extra',
    buttonSel = '.read-more',
    height = null,
} = {}) {
    const extras = [...document.querySelectorAll(extraSel)];
    const buttons = [...document.querySelectorAll(buttonSel)];
    const startingHeights = extras.map((extra) => {
        return height || extra.offsetHeight;
    });
    buttons.forEach((button, index) => {
        button.addEventListener('click', function (evt) {
            evt.preventDefault();
            toggleHeight(startingHeights[index], extras[index]);
        });
    });
}
