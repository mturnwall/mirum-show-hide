export const getActualHeight = (extra) => {
    const clone = extra.cloneNode(true);
    clone.style.height = 'auto';
    extra.parentNode.appendChild(clone);
    const height = clone.offsetHeight;
    extra.parentNode.removeChild(clone);
    return height;
};

export const toggleHeight = (height, extra) => {
    let autoHeight = ('defaultHeight' in extra.dataset) ? extra.dataset.defaultHeight : false;
    if (!autoHeight) {
        autoHeight = getActualHeight(extra);
        extra.dataset.defaultHeight = autoHeight;
    }
    extra.style.height = (extra.offsetHeight === height) ? `${autoHeight}px` : `${height}px`;
};

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
