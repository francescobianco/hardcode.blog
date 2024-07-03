document.addEventListener("DOMContentLoaded", function(){
  var toggle = document.getElementById("scheme-toggle");

  var scheme = "light";
  var savedScheme = localStorage.getItem("scheme");

  var container = document.getElementsByTagName("html")[0];
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (prefersDark) {
    scheme = "dark";
  }

  if(savedScheme) {
    scheme = savedScheme;
  }

  if(scheme == "dark") {
    darkscheme(toggle, container);
  } else {
    lightscheme(toggle, container);
  }

  toggle.addEventListener("click", () => {
    if (toggle.className === "light") {
      darkscheme(toggle, container);
    } else if (toggle.className === "dark") {
      lightscheme(toggle, container);
    }
  });
});

function darkscheme(toggle, container) {
  localStorage.setItem("scheme", "dark");
  toggle.innerHTML = feather.icons.sun.toSvg();
  toggle.className = "dark";
  container.className = "dark";
}

function lightscheme(toggle, container) {
  localStorage.setItem("scheme", "light");
  toggle.innerHTML = feather.icons.moon.toSvg();
  toggle.className = "light";
  container.className = "";
}

function writeNewPost(element) {
    const postDate = (new Date()).toISOString();
    const template = `---
title: "New post!"
description: "A bit of post."
date: ${postDate}
tags: ["tag1", "tag2"]
authors: ["Francesco Bianco"]
---

That's the post...
`;
    const dateSlug = (new Date()).toISOString().replace(/-/g, '').split('T')[0];
    const dirUrl = '/new/main/content/posts';
    const newPostUrl = element.href + dirUrl + '?filename=' + dateSlug + '-new-post.md&value=' + encodeURIComponent(template);

    window.open(newPostUrl, '_blank');

    return false;
}


function addCopyButtons(clipboard) {
    console.log('addCopyButtons');
    document.querySelectorAll('.highlight').forEach(function (codeBlock) {
        console.log('codeBlock', codeBlock);
        const button = document.createElement('button');
        button.className = 'code-button';
        button.type = 'button';
        button.innerText = 'Copy';

        button.addEventListener('click', function () {
            const cloneBlock = codeBlock.cloneNode(true);
            cloneBlock.querySelectorAll('.ln').forEach(element => element.remove());
            cloneBlock.querySelectorAll('.lnt').forEach(element => element.remove());
            cloneBlock.querySelectorAll('.code-button').forEach(element => element.remove());
            clipboard.writeText(cloneBlock.innerText.trim()).then(function () {
                button.blur();
                button.classList.add('copied');
                button.innerText = 'Copied!';
                setTimeout(function () {
                    button.innerText = 'Copy';
                    button.classList.remove('copied');
                }, 1500);
            }, function (error) {
                button.innerText = 'Error';
            });
        });

        codeBlock.append(button)
    });
}

function applyAdmonitions() {
    const icons = { question: '🤔', note: '📝', caution: '🚨', tip: '💡', important: '📢', warning: '⚠️' };

    document.querySelectorAll('.markdown blockquote').forEach(function (blockquote) {
        const innerHtml = blockquote.innerHTML.trim();
        const match = innerHtml.match(/^<p>!!! ([a-z]+) “(.*)”(.*)/s)
        const icon = icons[match[1]] || icons['info']
        if (match) {
            console.log('match', match);
            const admonition = document.createElement('div');
            admonition.className = 'admonition admonition-' + match[1];
            admonition.innerHTML = `
                <div class="admonition-title">
                    <div class="admonition-icon">${icon}</div>
                    ${match[2]}
                </div>
                <div class="admonition-content">
                    <p>${match[3]}
                </div>
            `;
            blockquote.parentNode.replaceChild(admonition, blockquote);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    applyAdmonitions();

    if (navigator && navigator.clipboard) {
        addCopyButtons(navigator.clipboard);
    } else {
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.7.0/clipboard-polyfill.promise.js';
        script.integrity = 'sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94=';
        script.crossOrigin = 'anonymous';
        script.onload = function() {
            addCopyButtons(clipboard);
        };

        document.body.appendChild(script);
    }
});

