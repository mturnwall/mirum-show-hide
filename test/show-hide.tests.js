import test from 'ava';
import expand, {startingHeight} from '../src/show_hide';

// fake the offsetHeight value
Object.defineProperty(window.HTMLElement.prototype, 'offsetHeight', {
    value: 0,
    writable: true,
});

Object.defineProperty(window.HTMLElement.prototype, 'dataset', {
    value: {
        defaultHeight: null,
    },
});

test.beforeEach((t) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    wrapper.style.width = '500px';

    const intro = document.createElement('div');
    intro.classList.add('intro');
    intro.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis iure neque possimus odio molestiae? Asperiores quisquam numquam nemo, alias unde maiores nisi ullam nostrum, dolor architecto officia illum quas tempora!';
    wrapper.appendChild(intro);

    const extra = document.createElement('div');
    extra.classList.add('extra');
    extra.innerHTML = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia nostrum at quaerat illo eius vitae necessitatibus culpa autem sed, aliquid repellat quidem. Non veritatis ea, ducimus repellendus magnam placeat ad.
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis cum, consequuntur non dolore laboriosam labore deleniti. Minima quam distinctio nisi! Unde quidem laborum, sed accusamus qui quo, eius aliquid quasi!`;
    wrapper.appendChild(extra);
    const button = document.createElement('button');

    button.classList.add('read-more');
    button.innerHTML = 'Read More';
    wrapper.appendChild(button);
    document.body.appendChild(wrapper);
});

test('Expand the read more container', (t) => {
    const extra = document.querySelector('.extra');
    const button = document.querySelector('.read-more');
    expand();
    button.click();
    const expandedHeight = extra.dataset.defaultHeight;
    const newHeight = window.getComputedStyle(extra, null).getPropertyValue('height').replace('px', '');
    t.is(parseInt(newHeight, 10), expandedHeight, 'Extra container is expanded');
});

test('Collapse the read more container', (t) => {
    const extra = document.querySelector('.extra');
    extra.offsetHeight = 200;
    const button = document.querySelector('.read-more');
    expand();
    button.click();
    t.is(window.getComputedStyle(extra, null).getPropertyValue('height'), '0px', 'Extra container is collapsed');
});

test('Using elements offsetHeight as collapsed height', (t) => {
    const extra = document.querySelector('.extra');
    extra.offsetHeight = 0;
    expand();
    t.is(startingHeight, 0, 'Starting height equals value of element.offsetHeight');
});

test('Passing in a height to override styled height', (t) => {
    const extra = document.querySelector('.extra');
    extra.offsetHeight = 200;
    expand();
    t.is(startingHeight, extra.offsetHeight, 'Starting height equals height of element');
    expand({
        height: 100,
    });
    t.is(startingHeight, 100, 'Starting height equals the value passed in');
});


