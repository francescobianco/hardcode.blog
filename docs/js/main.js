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
tags: [tag1, tag2]
---

That's the post...
`;
    const dateSlug = (new Date()).toISOString().replace(/-/g, '').split('T')[0];
    const dirUrl = '/new/main/content/posts';
    const newPostUrl = element.href + dirUrl + '?filename=' + dateSlug + '-new-post.md&value=' + encodeURIComponent(template);

    window.open(newPostUrl, '_blank');

    return false;
}
