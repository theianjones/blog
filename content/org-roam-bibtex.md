---
title: Org Roam Bibtex
aliases: [org roam bibtex]
type: post
date: 2020-06-04
tags: [org roam, org mode, emacs]
---

## Table of Contents

1.  [Introduction](/org-roam-bibtex#org726c9f4)
2.  [Zotero for Bibliography management](/org-roam-bibtex#org029cb5a)
3.  [Set up Org Noter](/org-roam-bibtex#orge327d8c)
4.  [Set up Helm Bibtex](/org-roam-bibtex#orgb716c96)
5.  [Set up Org Ref](/org-roam-bibtex#orgc11f057)
6.  [Org Roam Bibtex (ORB)](/org-roam-bibtex#orgf4ff9fb)
7.  [Workflow](/org-roam-bibtex#org3fdc4e0)

- **tags:** [[Org Roam Bibtex]], [[Org Ref]], [[Org Roam]], [[Note Taking]]

I used heavily when setting this up.

<a id="org726c9f4"></a>

## Introduction

Warning: There is a lot going on with this configuration. This assumes that you have org-roam set up. We will use:

- `org-ref` to manage citation links
- `helm-bibtex` to manage notes/pdfs
- `org-noter` to take notes on a pdf
- `org-noter-pdf-tools` to help with rendering the pdf and some integration.
- `org-roam-bibtex` to stich all of these things together and generate templates for us.
- `Zotero` an application to manage your external bibliography

<a id="org029cb5a"></a>

## Zotero for Bibliography management

[Zotero](https://www.zotero.org/) is an application that has a lot of tools built in for managing bibliographies. I like it because it will fetch meta data from pdfs you link it automatically (if its available).

I haven&rsquo;t had the time to explore its capabilities so I use it to generate a `.bib` file for `org-roam-bibtex` to use.

I use `brew` to manage as much as I on macos so thats how I installed Zotero:

    brew cask install zotero

Side note: `brew cask install` is for any application that you need to &ldquo;drag into the application folder&rdquo;.

Everyone reccommends the &ldquo;better bibtex&rdquo; extention. From [retorque.re](https://retorque.re/zotero-better-bibtex/installation/), heres how you install the extension:

> 1.  In the main menu go to Tools > Add-ons
> 2.  Select ‘Extensions’
> 3.  Click on the gear in the top-right corner and choose ‘Install Add-on From File…’
> 4.  Choose .xpi that you’ve just downloaded, click ‘Install’
> 5.  Restart Zotero

Now we want to set up a `.bib` file that will sync automatically when you capture a bibliography in Zotero.

Heres how:

1.  Right click &ldquo;My Library&rdquo;
2.  Click &ldquo;Export Library&rdquo;
3.  Select the correct options and press OK
    - Format: Better BibLateX
    - Check Export Notes
    - Check Keep Updated
4.  Name it masterLib.bib (or whatever you want)
5.  Select the export location, we will need the path to it later

<a id="orge327d8c"></a>

## Set up Org Noter

Heres the config for org noter you need inside of your `config.el`:

```
(use-package! org-noter
:after (:any org pdf-view)
    :config
    (setq
        ;; The WM can handle splits
        org-noter-notes-window-location 'other-frame
         ;; Please stop opening frames
         org-noter-always-create-frame nil
         ;; I want to see the whole file
         org-noter-hide-other nil
         ;; Everything is relative to the main notes file
         org-noter-notes-search-path (list org_notes)
       )
      )
```

I had to install `org-pdftools` and `org-noter-pdftools` to actually view pdfs in emacs. I believe I ran `M-x pdf-tools-install` and added this to `config.el`:

    (use-package org-pdftools
      :hook (org-load . org-pdftools-setup-link))

    (use-package org-noter-pdftools
      :after org-noter
      :config
      (with-eval-after-load 'pdf-annot
        (add-hook 'pdf-annot-activate-handler-functions#'org-noter-pdftools-jump-to-note)))

<a id="orgb716c96"></a>

## Set up Helm Bibtex

At the top of my `config.el` I have some variables set:

    (setq
       org_notes "~/Desktop/03-resources/org-roam"
       zot_bib "~/Desktop/03-resources/masterLib.bib"
       org-directory org_notes
       deft-directory org_notes
       org-roam-directory org_notes
       org-default-notes-file (concat org_notes "/inbox.org")
       )

This makes `org_notes` and `zot_bib` available in the file. Replace those paths with wherever your org-roam is set up as well as where you exported your `masterLib.bib`.

Heres my config for Helm Bibtex:

    (setq
     bibtex-completion-notes-path org_notes
     bibtex-completion-bibliography zot_bib
     bibtex-completion-pdf-field "file"
     bibtex-completion-notes-template-multiple-files
     (concat
      "#+TITLE: ${title}\n"
      "#+ROAM_KEY: cite:${=key=}\n"
      "* TODO Notes\n"
      ":PROPERTIES:\n"
      ":Custom_ID: ${=key=}\n"
      ":NOTER_DOCUMENT: %(orb-process-file-field \"${=key=}\")\n"
      ":AUTHOR: ${author-abbrev}\n"
      ":JOURNAL: ${journaltitle}\n"
      ":DATE: ${date}\n"
      ":YEAR: ${year}\n"
      ":DOI: ${doi}\n"
      ":URL: ${url}\n"
      ":END:\n\n"
      )
     )

This sets where helm will look for bibliography entries (although, im not sure if Org Roam Bibtex overrides this template, is this really needed?). This is the template we will use when creating notes based off of a bibliography.

<a id="orgc11f057"></a>

## Set up Org Ref

Org ref lets you manage your `cite:` links. We use our `zot_bib` and `org_notes` variables we set earlier.

    (use-package! org-ref
        :config
        (setq
             org-ref-completion-library 'org-ref-ivy-cite
             org-ref-get-pdf-filename-function 'org-ref-get-pdf-filename-helm-bibtex
             org-ref-default-bibliography (list zot_bib)
             org-ref-bibliography-notes (concat org_notes "/bibnotes.org")
             org-ref-note-title-format "* TODO %y - %t\n :PROPERTIES:\n  :Custom_ID: %k\n  :NOTER_DOCUMENT: %F\n :ROAM_KEY: cite:%k\n  :AUTHOR: %9a\n  :JOURNAL: %j\n  :YEAR: %y\n  :VOLUME: %v\n  :PAGES: %p\n  :DOI: %D\n  :URL: %U\n :END:\n\n"
             org-ref-notes-directory org_notes
             org-ref-notes-function 'orb-edit-notes
        ))

Its important to note (as [rgoswami.me](https://rgoswami.me/posts/org-note-workflow/#org-ref) does) that org-refs template options are not the same (note that I didn&rsquo;t write this template and just copy pasta&rsquo;d). Heres a cheatsheet:

```
In the format, the following percent escapes will be expanded.
%l The BibTeX label of the citation.
%a List of author names, see also \`reftex-cite-punctuation&rsquo;.
%2a Like %a, but abbreviate more than 2 authors like Jones et al.
%A First author name only.
%e Works like %a, but on list of editor names. (%2e and %E work as well)
It is also possible to access all other BibTeX database fields:
%b booktitle %c chapter %d edition %h howpublished
%i institution %j journal %k key %m month
%n number %o organization %p pages %P first page
%r address %s school %u publisher %t title
%v volume %y year
%B booktitle, abbreviated %T title, abbreviated
%U url
%D doi
%S series %N note
%f pdf filename
%F absolute pdf filename
Usually, only %l is needed. The other stuff is mainly for the echo area
display, and for (setq reftex-comment-citations t).
%< as a special operator kills punctuation and space around it after the
string has been formatted.
A pair of square brackets indicates an optional argument, and RefTeX
will prompt for the values of these arguments.
```

<a id="orgf4ff9fb"></a>

## Org Roam Bibtex (ORB)

ORB stitches everything together, Heres my config:

    (use-package org-roam-bibtex
      :after (org-roam)
      :hook (org-roam-mode . org-roam-bibtex-mode)
      :config
      (setq orb-preformat-keywords
       '("=key=" "title" "url" "file" "author-or-editor" "keywords"))
      (setq orb-templates
            '(("r" "ref" plain (function org-roam-capture--get-point)
               ""
               :file-name "${slug}"
               :head "#+TITLE: ${=key=}: ${title}\n#+ROAM_KEY: ${ref}
    - tags ::
    - keywords :: ${keywords}

    \n* ${title}\n  :PROPERTIES:\n  :Custom_ID: ${=key=}\n  :URL: ${url}\n  :AUTHOR: ${author-or-editor}\n  :NOTER_DOCUMENT: %(orb-process-file-field \"${=key=}\")\n  :NOTER_PAGE: \n  :END:\n\n"
               :unnarrowed t))))

<a id="org3fdc4e0"></a>

## Workflow

First you need to add a PDF to Zotero. Ill use [this](https://eric.ed.gov/?id=ED388279) pdf as an example. Store it in some place. Then head over to Zotero to add it to your bibliography.

Press the plus button and then &ldquo;Link to File&rdquo;. You should see Zotero auto fill a bunch of info.

Now you can add a citation in your notes with `M-x helm-bibtex` generates a cite link. `cite:oneillColLaboratoryNotebook` Press enter on the link, and select the &ldquo;Add Note&rdquo; option.

The note should be populated with properties and a ROAM<sub>KEY</sub>. Now its time to open the pdf. `M-x org-noter`. The pdf should show up in a new frame as well as the notes in an other. I want them to show up in the same frame but haven&rsquo;t figured that out yet.

Now you can highlight a line in the pdf and type `M-x org-noter-insert-note` and type your note and press enter. Your note will be added to the page with properties to actually navigate to the highlight when you come back to your not later.

Its amazing.
