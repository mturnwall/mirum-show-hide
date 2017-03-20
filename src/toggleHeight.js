import getActualHeight from './getActualHeight';

export default function (height, extra) {
    let autoHeight = ('defaultHeight' in extra.dataset) ? extra.dataset.defaultHeight : false;
    if (!autoHeight) {
        autoHeight = getActualHeight(extra);
        extra.dataset.defaultHeight = autoHeight;
    }
    extra.style.height = (extra.offsetHeight === height) ? `${autoHeight}px` : `${height}px`;
}
