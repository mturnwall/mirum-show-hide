let extra = null;
let button = null;
export let startingHeight = null;

const getActualHeight = () => {
    const clone = extra.cloneNode(true);
    clone.style.height = 'auto';
    extra.parentNode.appendChild(clone);
    const height = clone.offsetHeight;
    extra.parentNode.removeChild(clone);
    return height;
};

const toggleHeight = (height) => {
    let autoHeight = ('defaultHeight' in extra.dataset) ? extra.dataset.defaultHeight : false;
    if (!autoHeight) {
        autoHeight = getActualHeight();
        extra.dataset.defaultHeight = autoHeight;
    }
    extra.style.height = (extra.offsetHeight === height) ? `${autoHeight}px` : `${height}px`;
};

export default function ({
    extraSel = '.extra',
    buttonSel = '.read-more',
    height = null,
} = {}) {
    extra = document.querySelector(extraSel);
    button = document.querySelector(buttonSel);
    startingHeight = height || extra.offsetHeight;
    button.addEventListener('click', function (evt) {
        evt.preventDefault();
        toggleHeight(startingHeight);
    });
}
