import test from 'ava';
import {getActualHeight} from '../src/show_hide';
import {stub} from 'sinon';

const cloneNode = stub();
const appendChild = stub();
const removeChild = stub();
const mockExtra = {
    style: {
        height: 'HEIGHT',
    },
    offsetHeight: 'OFFSET_HEIGHT',
    parentNode: {
        appendChild,
        removeChild,
    },
};
const mockClone = Object.assign({}, mockExtra);
mockExtra.cloneNode = cloneNode.returns(mockExtra);
mockClone.cloneNode = mockExtra.cloneNode;

test.afterEach.always(() => {
    cloneNode.reset();
    appendChild.reset();
    removeChild.reset();
});

test('getActualheight', t => {
    const subject = getActualHeight(mockExtra);
    t.true(
        cloneNode.calledOnce && cloneNode.calledWithExactly(true),
        'calls cloneNode with true'
    );

    t.true(
        mockClone.style.height === 'auto',
        'sets clone height to auto'
    );

    t.true(appendChild.calledOnce);

    t.deepEqual(
        appendChild.lastCall.args[0],
        mockClone,
        'appends clone to parentNode with height set to auto'
    );

    t.true(removeChild.calledOnce);

    t.deepEqual(
        removeChild.lastCall.args[0],
        mockClone,
        'removes clone from parentNode'
    );

    t.is(
        subject,
        mockExtra.offsetHeight,
        'returns offset height of clone appended to parent node'
    );
});
