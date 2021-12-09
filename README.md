# HARDCODE.BLOG

> Last update: Wed Jul 21 09:57:54 UTC 2021

[![Deploy](https://github.com/francescobianco/hardcode.blog/actions/workflows/deploy.yml/badge.svg)](https://github.com/francescobianco/hardcode.blog/actions/workflows/deploy.yml)
[![Super Linter](https://github.com/francescobianco/hardcode.blog/actions/workflows/super-linter.yml/badge.svg)](https://github.com/francescobianco/hardcode.blog/actions/workflows/super-linter.yml)

This is my personal blog, the place where I talk about programming stuff.

- [Docker](https://hardcode.blog/tags/docker/)
- [Vtiger](https://hardcode.blog/tags/vtiger/)
- Shell Programming (Coming Soon)
- [Italiano](https://hardcode.blog/tags/italiano/)

## Credits

### Logo

Source: <https://creazilla.com/nodes/59048-bull-logo-clipart>
 
- Author: Creazilla  
- Attribution link: <https://publicdomainvectors.org>  
- License: 
  Public Domain License. This content is free of known copyright restrictions and therefore in the public domain. 
  It can be freely copied, shared, altered and republished by anyone for personal and commercial projects. 
  You do not need to ask permission or provide credit to the author, 
  although it is appreciated when possible to credit author or source of the content. 
  You may obtain a copy of the License at <https://creativecommons.org/publicdomain/zero/1.0/>.


## TL;DR

Crisp, minimal personal website and blog theme Hugo. Forked from [Ezhil](https://github.com/vividvilla/ezhil).

### Features

* Google Analytics integration
* Syntax highlighting
* Twitter cards and opengraph tags support
* Disqus comments
* RSS feeds
* Custom CSS/JS
* Multilingual months support

### Installation

cd into your hugo site's root directory and:

```sh
cd themes
git clone https://github.com/knadh/hugo-ink.git
```

For more information read the [official setup guide](https://gohugo.io/overview/installing/) of Hugo.

### Content type

You can specify content type with field `type` in your content. For example static pages can be set as type `page` which are excluded from recent posts and all posts page. You can use site params `mainSections` and `disableDisqusTypes` to control which page types are excluded from recent posts and Disqus comments respectively.

```md
---
title: "About"
date: 2019-04-19T21:37:58+05:30
type: "page"
---

This is some static page where you can write about yourself.
```

### Language Settings for the month

Due to the currently unavailable feature for multilingual dates in ``.Date`` from
Go. It is possible to create a ``month.yaml`` in the data folder of your
Hugo site root directory. There is also an example file in
``exampleSite/data/``.

```sh
cat > month.yaml << EOF
1: "Jan"
2: "Feb"
3: "Mar"
4: "Apr"
5: "May"
6: "Jun"
7: "Jul"
8: "Aug"
9: "Sep"
10: "Oct"
11: "Nov"
12: "Dec"
EOF
```

### Credits

* [Ezhil theme](https://github.com/vividvilla/ezhil) from which Ink was forked

Licensed under the MIT license.
