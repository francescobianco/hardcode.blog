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

function remoteExec(language, command, code, callback) {
    fetch('https://api.codapi.org/v1/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sandbox: language,
            command: command,
            files: {
                "": code
            }
        })
    }).then(response => response.json()).then(data => {
        //console.log('Risposta JSON:', data);
        callback(data);
    })
}

function renderGraphs() {
    console.log('addGraphs');
    document.querySelectorAll('.highlight').forEach(function (graphBlock, index) {
        if (graphBlock.classList.contains('is-plantuml')) {
            const pre = graphBlock.querySelector('pre');
            const image = document.createElement('img');
            pre.style.display = 'none';
            image.src = '//www.plantuml.com/plantuml/dpng/' + plantumlEncoder.encode(pre.innerText + "");
            graphBlock.append(image)
        }
    });
}

function addTerminals() {
    console.log('addTerminals');
    const supportedCommands = ['sh']
    document.querySelectorAll('.highlight').forEach(function (termBlock, index) {
        if (!termBlock.classList.contains('is-terminal')) {
            return;
        }
        const termBlockId = 'term-' + index;
        const language = termBlock.querySelector('[data-lang]').getAttribute('data-lang')
        termBlock.id = termBlockId;
        console.log('termBlock', termBlock);
        const commands = {};
        for (let command of supportedCommands) {
            commands[command] = function (terminal, args) {
                remoteExec(language, 'run', command + ' ' + args.join(' '), function (data) {
                    terminal.output(data.stdout + data.stderr);
                });
            };
        }
        const terminal = new VanillaTerminal({
            welcome: '',
            container: termBlockId,
            prompt: 'you@hardcode.blog:~',
            separator: '$ ',
            commands: commands,
        });
        termBlock.querySelector('input').focus = function() {};
        termBlock.querySelector('input').scrollIntoView = function() {};
    });
}

function addCodeButtons(clipboard) {
    console.log('addCopyButtons');
    document.querySelectorAll('.highlight').forEach(function (codeBlock) {
        if (codeBlock.classList.contains('is-terminal')) {
            return;
        }
        if (codeBlock.classList.contains('is-plantuml')) {
            return;
        }
        console.log('codeBlock', codeBlock);
        const codeButtons = document.createElement('div');
        const runButton = document.createElement('button');
        const copyButton = document.createElement('button');
        const output = document.createElement('pre');
        const language = codeBlock.querySelector('[data-lang]').getAttribute('data-lang')

        codeButtons.className = 'code-buttons';

        runButton.className = 'code-button';
        runButton.type = 'button';
        runButton.innerText = '▶';

        copyButton.className = 'code-button';
        copyButton.type = 'button';
        copyButton.innerText = 'Copy';

        output.className = 'code-output';
        output.style.display = 'none';

        runButton.addEventListener('click', function () {
            const cloneBlock = codeBlock.cloneNode(true);
            cloneBlock.querySelectorAll('.ln').forEach(element => element.remove());
            cloneBlock.querySelectorAll('.lnt').forEach(element => element.remove());
            cloneBlock.querySelectorAll('.code-buttons').forEach(element => element.remove());

            runButton.disabled = true;

            output.innerHTML = '<code>Loading...</code>'
            output.style.display = 'block';
            setTimeout(function () {
                fetch('https://api.codapi.org/v1/exec', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sandbox: language,
                        command: "run",
                        files: {
                            "": cloneBlock.innerText.trim()
                        }
                    })
                }).then(response => response.json()).then(data => {
                    console.log('Risposta JSON:', data);
                    output.innerHTML = '<code>' + data.stdout + data.stderr + '</code>';
                    setTimeout(function () {
                        runButton.blur();
                        runButton.disabled = false;
                    }, 2000)
                })
            }, 1000)
        });

        copyButton.addEventListener('click', function () {
            const cloneBlock = codeBlock.cloneNode(true);
            cloneBlock.querySelectorAll('.ln').forEach(element => element.remove());
            cloneBlock.querySelectorAll('.lnt').forEach(element => element.remove());
            cloneBlock.querySelectorAll('.code-buttons').forEach(element => element.remove());
            clipboard.writeText(cloneBlock.innerText.trim()).then(function () {
                copyButton.blur();
                copyButton.classList.add('copied');
                copyButton.innerText = 'Copied!';
                setTimeout(function () {
                    copyButton.innerText = 'Copy';
                    copyButton.classList.remove('copied');
                }, 1500);
            }, function (error) {
                copyButton.innerText = 'Error';
            });
        });

        if (codeBlock.classList.contains('is-runnable')) {
            codeButtons.append(runButton)
            codeBlock.insertAdjacentElement('afterend', output);
        }

        codeButtons.append(copyButton)
        codeBlock.append(codeButtons)
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

function downloadCoverImage() {
    const meta = document.querySelector('meta[property="og:image"]')
    console.log()
    const link = document.createElement('a');
    link.href = meta.getAttribute('content');
    link.download = 'cover.' + link.href.split('.').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function shareOnLinkedIn() {
    const link = document.createElement('a');
    copyToClipboard("Mi crei un lancio per questo post: " + window.location.href + " metti il post in un blocco codice cosi potro copiarlo, non usare il markdown, metti le emoji")
    const post = "paste-clipboard";
    link.href = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(post)
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function copyToClipboard(text) {
    const tempElement = document.createElement('textarea');
    tempElement.value = text;
    document.body.appendChild(tempElement);
    tempElement.select();
    tempElement.setSelectionRange(0, 99999); // Per dispositivi mobili
    document.execCommand('copy');
    document.body.removeChild(tempElement);
}

document.addEventListener('DOMContentLoaded', function() {
    renderGraphs();
    addTerminals();
    applyAdmonitions();

    if (navigator && navigator.clipboard) {
        addCodeButtons(navigator.clipboard);
    } else {
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.7.0/clipboard-polyfill.promise.js';
        script.integrity = 'sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94=';
        script.crossOrigin = 'anonymous';
        script.onload = function() {
            addCodeButtons(clipboard);
        };

        document.body.appendChild(script);
    }
});

