import test from 'ava';
import expand, {__RewireAPI__ as ExpandRewireAPI} from '../src/show_hide';
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
    expand();

    t.true(
        querySelectorAll.firstCall.calledWithExactly('.extra'),
        'querySelectorAll called for all the hidden elements'
    );
});

test('Get read more buttons with default selector', t => {
    expand();

    t.true(
        querySelectorAll.secondCall.calledWithExactly('.read-more'),
        'hello world'
    );
});

test('Pass in custom selectors', t => {
    expand({
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
    expand();
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
    expand();
    mockButtons.forEach(value => {
        value.addEventListener.firstCall.args[1]({preventDefault});
    });

    for (let i = 0; i < mockButtons.length; i += 1) {
        const stubCall = toggleHeightStub.getCall(i);
        t.true(
            stubCall.calledWithExactly(mockMultipleExtras[i].offsetHeight, mockMultipleExtras[i]),
            'toggleHeight called with with incorrect parameters'
        );
    }
});

test('Use passed in value for height', (t) => {
    expand({
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

// test('Use element\'s offsetHeight', (t) => {
//     querySelector.onFirstCall().returns(mockExtra);
//     querySelector.onSecondCall().returns({addEventListener});
//     expand();
//
//     t.true(
//         querySelector.firstCall.calledWithExactly('.extra'),
//         'querySelector called for the hidden element'
//     );
//     t.true(
//         querySelector.secondCall.calledWithExactly('.read-more'),
//         'querySelector called for the trigger button'
//     );
//     t.true(
//         addEventListener.calledOnce,
//         'addEventListener bound to the the trigger button'
//     );
//
//     t.is(
//         addEventListener.firstCall.args[0],
//         'click',
//         'The click event was bound to the trigger button'
//     );
//
//     addEventListener.firstCall.args[1]({preventDefault});
//     t.true(
//         preventDefault.calledOnce,
//         'Click event was triggered'
//     );
//
//     t.true(
//         toggleHeightStub.calledOnce,
//         'toggleHeight was called'
//     );
//
//     t.true(
//         toggleHeightStub.calledWithExactly(0, mockExtra),
//         'toggleHeight called with correct parameters'
//     );
// });

