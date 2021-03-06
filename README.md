# Mirum Show Hide

[![Build Status](https://travis-ci.org/mturnwall/mirum-show-hide.svg?branch=master)](https://travis-ci.org/mturnwall/mirum-show-hide) [![Known Vulnerabilities](https://snyk.io/test/github/mturnwall/mirum-show-hide/badge.svg)](https://snyk.io/test/github/mturnwall/mirum-show-hide)

A module that will collapse and expand a div container. This is usually used for a content where part of the content is hidden with a "read more" button reveals the rest of the content. For terminology, this documentation refers to the element that expands and collapses as the "extra" element since it contains extra content.

The benefit of using this module is you don't have to set a massively high `max-height` in the CSS. Not using `max-height` leads to a smoother animation when opening the collapsed element. The module uses the starting height of the "extra" element which is set in the CSS.

## Installation

`npm install --save-dev show-hide` 

## Usage

In your project import the module. This will usually be your main javascript but can actually be any javascript where it's required.

`import showHide from 'show-hide';`

By default the module will look for `.extra` as the selector for the element that is collapsed and `.read-more` for the element that will trigger `.extra` to expand. You can overwrite these selectors by passing them when you call the module.

```javascript
showHide({
    extraSel: '.my-extra',
    buttonSel: '.my-button'
});
```

The collapsed height of the `.extra` element is determined by the `height` value in the css. If for someone reason you need to override this value you can pass the desired starting height like this.
 
```javascript
showHide({
    height: 100
});
```

See the html file in the example folder for a demo of the module.

### Accordion

It is possible to use the module as an accordion. If you have multiple elements that expand you can turn on the accordion feature. This results on whichever element is currently expanded to close when you open another one. Set the `accordion` parameter to `true`. The default state is `false`.

```javascript
showHide({
    accordion: true
});
```

## API

### showHide([{extraSel, buttonSel, height}])

#### Parameters

`[extraSel = '.extra']` - {string} The selector of the element that will expand and contract

`[buttonSel = '.read-more']` - {string} The selector of the element that when clicked will trigger the expand/contract

`height` - {number} Override the element's height that was set in the CSS.

`accordion = false` - {boolean} set to `true` to enable accordion mode.

## Contributing

Everyone is encouraged to contribute to this module. If see a way to improve the module please do.

## Version History


## License

(The MIT License)

Copyright (c) 2017 Mirum, Inc

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
