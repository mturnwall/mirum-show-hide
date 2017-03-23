export default function (extra) {
    const clone = extra.cloneNode(true);
    clone.style.height = 'auto';
    extra.parentNode.appendChild(clone);
    const height = clone.offsetHeight;
    extra.parentNode.removeChild(clone);
    return height;
}
