# autobrowse

A simple browser automation helper, given you know where you want to run
your browsers from.  There is no automatic browser discovery (as per
what [browser-launcher](https://github.com/substack/browser-launcher) does).

## Why?

Unfortunately I require some functionality that differs from the way
browser-launcher works at it's core.  Chances are that for most people's
use cases, browser-launcher is probably a better choice.

## Reference

### autobrowse(executable, url, opts?, callback)

## Acknowledgements

This module uses many tricks that
[browser-launcher](https://github.com/substack/browser-launcher) does for
creating profiles, etc. So massive thanks to @substack and other
`browser-launcher` contributors for their efforts.

## Firefox Compatibility Layer

This is the compatibility layer for firefox.
