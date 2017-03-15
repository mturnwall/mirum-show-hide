let extra = null;
let button = null;

const getActualHeight = () => {
    const clone = extra.cloneNode(true);
    clone.style.height = 'auto';
    extra.parentNode.appendChild(clone);
    const height = clone.offsetHeight;
    extra.parentNode.removeChild(clone);
    return height;
};

const toggleHeight = (height) => {
    console.log(extra.dataset);
    let autoHeight = ('defaultHeight' in extra.dataset) ? extra.dataset.defaultHeight : false;
    console.log('autoheight is', autoHeight);
    if (!autoHeight) {
        autoHeight = getActualHeight();
        console.log('autoHeight becomes', autoHeight);
        extra.dataset.defaultHeight = autoHeight;
        console.log(extra.dataset.defaultHeight);
    }
    console.log('extra.offsetHeight', extra.offsetHeight);
    extra.style.height = (extra.offsetHeight === height) ? `${autoHeight}px` : `${height}px`;
    console.log('style.height is', extra.style.height);
};

export default function (extraSel = '.extra', buttonSel = '.read-more', startingHeight = 0) {
    extra = document.querySelector(extraSel);
    button = document.querySelector(buttonSel);
    button.addEventListener('click', function (evt) {
        evt.preventDefault();
        toggleHeight(startingHeight);
    });
}
