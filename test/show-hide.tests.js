import test from 'ava';
import expand, {getActualHeight, toggleHeight, __RewireAPI__ as ExpandRewireAPI} from '../src/show_hide';
import {stub} from 'sinon';

let cloneNode = stub();
let appendChild = stub();
let removeChild = stub();
let toggleHeightStub = stub();
let preventDefault = stub();
let addEventListener = stub();
let mockExtra = {
    offsetHeight: 0,
};

const querySelector = stub(document, 'querySelector');

ExpandRewireAPI.__Rewire__('toggleHeight', toggleHeightStub);

test.afterEach.always(() => {
    cloneNode.reset();
    appendChild.reset();
    removeChild.reset();
    preventDefault.reset();
    addEventListener.reset();
    querySelector.reset();
    toggleHeightStub.reset();
});
test.after(() => {
    ExpandRewireAPI.__ResetDependency__('toggleHeight');
});

test('Use element\'s offsetHeight', (t) => {
    querySelector.onFirstCall().returns(mockExtra);
    querySelector.onSecondCall().returns({addEventListener});
    expand();

    t.true(
        querySelector.firstCall.calledWithExactly('.extra'),
        'querySelector called for the hidden element'
    );
    t.true(
        querySelector.secondCall.calledWithExactly('.read-more'),
        'querySelector called for the trigger button'
    );
    t.true(
        addEventListener.calledOnce,
        'addEventListener bound to the the trigger button'
    );

    t.is(
        addEventListener.firstCall.args[0],
        'click',
        'The click event was bound to the trigger button'
    );

    addEventListener.firstCall.args[1]({preventDefault});
    t.true(
        preventDefault.calledOnce,
        'Click event was triggered'
    );

    t.true(
        toggleHeightStub.calledOnce,
        'toggleHeight was called'
    );

    t.true(
        toggleHeightStub.calledWithExactly(0, mockExtra),
        'toggleHeight called with correct parameters'
    );
});

test('Use passed in value for height', (t) => {
    querySelector.onFirstCall().returns(mockExtra);
    querySelector.onSecondCall().returns({addEventListener});
    // ExpandRewireAPI.__Rewire__('toggleHeight', toggleHeightStub);
    expand({
        height: 300,
    });
    addEventListener.firstCall.args[1]({preventDefault});
    t.is(
        toggleHeightStub.firstCall.args[0],
        300,
        'toggleHeight called with the height value that was passed in'
    );
});

