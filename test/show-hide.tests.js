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
        querySelector.firstCall.calledWithExactly('.extra')
    );
    t.true(
        querySelector.secondCall.calledWithExactly('.read-more')
    );
    t.true(
        addEventListener.calledOnce
    );

    t.is(
        addEventListener.firstCall.args[0],
        'click'
    );

    addEventListener.firstCall.args[1]({preventDefault});
    t.true(
        preventDefault.calledOnce
    );

    t.true(
        toggleHeightStub.calledOnce
    );

    t.true(
        toggleHeightStub.calledWithExactly(0, mockExtra)
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
        toggleHeightStub.firstCall.args[0], 300
    );
});

