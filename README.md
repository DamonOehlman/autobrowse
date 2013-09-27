# autobrowse

A simple browser automation helper, given you know where you want to run
your browsers from.  There is no automatic browser discovery (as per
what [browser-launcher](https://github.com/substack/browser-launcher) does).

## Why?

Unfortunately I require some functionality that differs from the way
browser-launcher works at it's core.  Chances are that for most people's
use cases, browser-launcher is probably a better choice.

## Reference

### autobrowse

```js
autobrowse(browserExecutable, url, opts?, callback?)
```

Launch the specified browser executable targeting the specified url.  The
`opts` arg can be used to specify particular [option packs](#option-packs)
that you wish to enable when running the browser.

## Acknowledgements

This module uses many tricks that
[browser-launcher](https://github.com/substack/browser-launcher) does for
creating profiles, etc. So massive thanks to @substack and other
`browser-launcher` contributors for their efforts.

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
