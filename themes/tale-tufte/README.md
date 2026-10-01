# Tale Tufte

A minimal Hugo theme for scientific writing. It combines the layout of
[Tale](https://github.com/EmielH/tale-hugo) with the sidenotes and margin notes
of [Tufte CSS](https://github.com/loikein/hugo-tufte), and renders math with
KaTeX at build time, so pages need no JavaScript.

Requires Hugo extended ≥ 0.146.

## Site configuration

```toml
theme = "tale-tufte"

[markup.goldmark.renderer]
  unsafe = true  # needed for shortcodes nested in other shortcodes

[markup.goldmark.extensions.passthrough]
  enable = true
  [markup.goldmark.extensions.passthrough.delimiters]
    block = [["$$", "$$"]]
    inline = [["$", "$"]]

[markup.highlight]
  noClasses = false

[params]
  description = "Shown on the home page and in the feed"
  keywords = ["…"]
  issuesURL = "https://github.com/…/issues"  # adds "Updates and Corrections" to posts
  [params.author]
    name = "…"

# Menu entries with an icon are shown as images.
[[menus.main]]
  name = "GitHub"
  url = "https://github.com/…"
  [menus.main.params]
    icon = "icons/github.png"
```

Posts are the pages in the main sections (by default the section with the most
pages, usually `posts`). The other pages, such as an about page, use the same
layout without the date, the footer and the navigation between posts.

Favicons are read from `static/images/favicon-16x16.png`,
`static/images/favicon-32x32.png` and `static/images/apple-touch-icon.png`.

## Dark mode

By default the site follows the system color scheme (`prefers-color-scheme`),
also without JavaScript. A button at the end of the menu cycles through
automatic (◐), light (☀) and dark (☾). The choice is stored in `localStorage`;
choosing automatic again clears it. Set `params.hideThemeToggle = true` to
remove the button and always follow the system.

Colors are CSS custom properties defined in `assets/scss/_colors.scss`. Menu
icons that would be invisible on a dark background (e.g. a black logo) can be
inverted with `invertInDark = true` in the menu entry params.

## Front matter

```yaml
title: Why convolutions are everywhere
description: Used in the meta description
summary: Lead paragraph shown under the title and in the post list.
math:
  macros:  # [name, definition] pairs; also accepted site-wide in params.math.macros
    - ['\R', '\mathbb{R}']
    - ['\argmin', '\underset{#1}{\text{arg\,min}}']
references:
  - "Mallat, Stéphane. *A wavelet tour of signal processing*. Elsevier, 1999."
```

References are numbered and get the anchors `#ref-1`, `#ref-2`, …

## Writing

Math uses the usual delimiters: `$x^2$` inline and `$$…$$` for display
equations. Invalid TeX fails the build and reports where the error is.

Notes go right after the word or sentence they refer to. On wide screens they
are shown in the right margin, aligned with the first line of their paragraph
(below the notes above, if those are still taking the space). On narrow screens
they are shown inline, below the line where they are written. Display equations
split paragraphs: a note written after an equation is aligned with the text
that follows the equation.

```markdown
A numbered sidenote.{{< sidenote >}}Content in *Markdown*, with $math$.{{< /sidenote >}}

An unnumbered margin note.{{< marginnote >}}Content in *Markdown*.{{< /marginnote >}}
```

Definitions, theorems and similar statements go in boxes, which can contain
display math and notes. Notes in a box are shown outside it: next to the top
of the box on wide screens (or as close as the notes above allow), below the
box on narrow screens.

```markdown
{{< box "Theorem" >}}
Let $f \in \ell^{p}(\mathbb{R})$ and $g \in \ell^{q}(\mathbb{R})$ be signals ...
$$
\frac{1}{p} + \frac{1}{q} = 1
$$
{{< /box >}}
```

## Updating Hugo

Hugo embeds KaTeX. When you update Hugo, check which KaTeX version it embeds
(`internal/warpc/js/package.json` in the Hugo repository) and update the
stylesheet link and its integrity hash in `layouts/_partials/head.html`.
