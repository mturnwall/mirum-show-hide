import test from 'ava';
import toggleHeight, {__RewireAPI__ as ExpandRewireAPI} from '../src/toggleHeight';
import {stub} from 'sinon';

const mockExtra = {
    dataset: {},
    style: {},
};
const getActualHeightStub = stub();
const querySelector = stub(document, 'querySelector');
const extraActualHeight = 200;

ExpandRewireAPI.__Rewire__('getActualHeight', getActualHeightStub);

test.afterEach.always(() => {
    querySelector.reset();
});

test.after(() => {
    ExpandRewireAPI.__ResetDependency__('getActualHeight');
    querySelector.restore();
});

test('extra div does not have defaultHeight set', (t) => {
    const toggledHeight = extraActualHeight;
    mockExtra.offsetHeight = 0;
    getActualHeightStub.returns(extraActualHeight);
    toggleHeight(0, mockExtra);

    t.true(
        getActualHeightStub.calledOnce,
        'getActualHeight called'
    );
    t.true(
        getActualHeightStub.calledWithExactly(mockExtra),
        'Extra container passed to getActualHeight'
    );
    t.is(
        mockExtra.dataset.defaultHeight,
        extraActualHeight,
        'defaultHeight has correct value of 200'
    );
    t.is(
        mockExtra.style.height,
        `${toggledHeight}px`,
        'Extra div height style property set to 200px'
    );
});

test('Extra div already has defaultHeight set', (t) => {
    const toggledHeight = 0;
    mockExtra.offsetHeight = extraActualHeight;
    toggleHeight(0, mockExtra);

    t.is(
        mockExtra.dataset.defaultHeight,
        extraActualHeight,
        'defaultHeight has correct value of 200'
    );
    t.is(
        mockExtra.style.height,
        `${toggledHeight}px`,
        'Extra div height style property set to 0px'
    );
});
