# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.0.0"></a>
# [1.0.0](https://github.com/mturnwall/mirum-show-hide/compare/v0.2.0...v1.0.0) (2018-07-18)


### Features

* Add accordion mode ([e7db22a](https://github.com/mturnwall/mirum-show-hide/commit/e7db22a))


### BREAKING CHANGES

* New option can be passed to the module to enable accordion
mode. The default value is "false". Setting it to "true" enables the mode.

showHide({
    accordion: true,
});
