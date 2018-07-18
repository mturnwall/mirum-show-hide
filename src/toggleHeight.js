import getActualHeight from './getActualHeight';

export default function (height, extra, accordion) {
    let autoHeight = ('defaultHeight' in extra.dataset) ? extra.dataset.defaultHeight : false;
    if (!autoHeight) {
        autoHeight = getActualHeight(extra);
        extra.dataset.defaultHeight = autoHeight;
    }
    if (accordion) {
        const currentActive = document.querySelector('[data-is-expanded]');
        if (currentActive) {
            currentActive.style.height = `${height}px`;
            delete currentActive.dataset.isExpanded;
        }
        if (currentActive !== extra) {
            extra.style.height = `${autoHeight}px`;
            extra.dataset.isExpanded = true;
        }
    } else {
        extra.style.height = (extra.offsetHeight === height) ? `${autoHeight}px` : `${height}px`;
    }
}
