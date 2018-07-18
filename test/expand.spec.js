import test from 'ava';
import showHide, {__RewireAPI__ as ExpandRewireAPI} from '../src/show_hide';
import {stub} from 'sinon';

let cloneNode = stub();
let appendChild = stub();
let removeChild = stub();
let toggleHeightStub = stub();
let preventDefault = stub();
let mockButtons = [
    {
        addEventListener: stub(),
    }, {
        addEventListener: stub(),
    }, {
        addEventListener: stub(),
    }, {
        addEventListener: stub(),
    },
];
let mockMultipleExtras = [
    {
        offsetHeight: 0,
    }, {
        offsetHeight: 0,
    }, {
        offsetHeight: 300,
    }, {
        offsetHeight: 0,
    },
];

// const querySelector = stub(document, 'querySelector');
const querySelectorAll = stub(document, 'querySelectorAll');

ExpandRewireAPI.__Rewire__('toggleHeight', toggleHeightStub);

test.beforeEach(t => {
    querySelectorAll.onFirstCall().returns(mockMultipleExtras);
    querySelectorAll.onSecondCall().returns(mockButtons);
});
test.afterEach.always(() => {
    cloneNode.reset();
    appendChild.reset();
    removeChild.reset();
    preventDefault.reset();
    mockButtons.forEach((value) => {
        value.addEventListener.reset();
    });
    querySelectorAll.reset();
    toggleHeightStub.reset();
});
test.after(() => {
    ExpandRewireAPI.__ResetDependency__('toggleHeight');
    document.querySelectorAll.restore();
});

test('Get hidden elements with default selector', t => {
    showHide();

    t.true(
        querySelectorAll.firstCall.calledWithExactly('.extra'),
        'querySelectorAll called for all the hidden elements'
    );
});

test('Get read more buttons with default selector', t => {
    showHide();

    t.true(
        querySelectorAll.secondCall.calledWithExactly('.read-more'),
        'hello world'
    );
});

test('Pass in custom selectors', t => {
    showHide({
        extraSel: '.customExtra1',
        buttonSel: '.customButton',
    });
    t.true(
        querySelectorAll.firstCall.calledWithExactly('.customExtra1'),
        'The custom selector for the hidden div was not used'
    );
    t.true(
        querySelectorAll.secondCall.calledWithExactly('.customButton'),
        'The custom selector for the button was not used'
    );
});

test('Event listener added to every button', t => {
    showHide();
    const listeners = mockButtons.filter(value => {
        return value.addEventListener.calledOnce;
    });
    t.is(
        listeners.length,
        mockButtons.length,
        'Number of event listeners does not equal number of buttons'
    );

    t.is(
        mockButtons[0].addEventListener.firstCall.args[0],
        'click',
        'The event bound was not the click event'
    );
});

test('Starting heights have correct default value', t => {
    showHide();
    mockButtons.forEach(value => {
        value.addEventListener.firstCall.args[1]({preventDefault});
    });

    for (let i = 0; i < mockButtons.length; i += 1) {
        const stubCall = toggleHeightStub.getCall(i);
        t.true(
            stubCall.calledWithExactly(mockMultipleExtras[i].offsetHeight, mockMultipleExtras[i], false),
            'toggleHeight called with with incorrect parameters'
        );
    }
});

test('Toggle accordion mode', t => {
    showHide({
        accordion: true,
    });
    mockButtons.forEach(value => {
        value.addEventListener.firstCall.args[1]({preventDefault});
    });

    for (let i = 0; i < mockButtons.length; i += 1) {
        const stubCall = toggleHeightStub.getCall(i);
        t.is(
            stubCall.args[2],
            true,
            'toggleHeight called with with incorrect parameters'
        );
    }
});

test('Use passed in value for height', (t) => {
    showHide({
        height: 300,
    });
    mockButtons.forEach(value => {
        value.addEventListener.firstCall.args[1]({preventDefault});
    });

    for (let i = 0; i < mockButtons.length; i += 1) {
        const stubCall = toggleHeightStub.getCall(i);
        t.is(
            stubCall.args[0],
            300,
            'toggleHeight should be called with 300 as the starting height'
        );
    }
});
