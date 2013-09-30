# autobrowse

A simple browser automation helper, given you know where you want to run
your browsers from.  There is no automatic browser discovery (as per
what [browser-launcher](https://github.com/substack/browser-launcher) does).


[![NPM](https://nodei.co/npm/autobrowse.png)](https://nodei.co/npm/autobrowse/)


## Why?

Unfortunately I require some functionality that differs from the way
browser-launcher works at it's core.  Chances are that for most people's
use cases, browser-launcher is probably a better choice.

## Reference

### autobrowse

```js
autobrowse(browserExecutable, uri, opts?, callback?)
```

Launch the specified browser executable targeting the specified uri.  The
`opts` arg can be used to specify particular [option packs](#option-packs)
that you wish to enable when running the browser.

## Acknowledgements

This module uses many tricks that
[browser-launcher](https://github.com/substack/browser-launcher) does for
creating profiles, etc. So massive thanks to @substack and other
`browser-launcher` contributors for their efforts.

## Automator

### cleanup()

Placeholder cleanup method.

### kill()

Close the process, run the cleanup method

## Firefox Compatibility Layer

This is the compatibility layer for firefox.

## Option Packs

Option Packs are used to modify browser functionality when being automated.

In most cases an option pack is enabled by simply calling `autobrowse`
making use of the options argument. For instance, the following is code that
you might use to launch a url in firefox nightly with the `webrtc` option
pack enabled.

```js
autobrowse('~/ff/nightly/firefox', 'http://google.com', { webrtc: true });
```

### Firefox

#### webrtc

Make firefox simpler to automate when working with WebRTC.  Specifically:

- disable the permission dialog for media capture
- enable the media source flag so we can load files for testing

## License(s)

### MIT

Copyright (c) 2013 Damon Oehlman <damon.oehlman@gmail.com>

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
