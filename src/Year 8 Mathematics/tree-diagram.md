---
marp: true
theme: uncover
style: |
  section.tree ul {
    position: relative;
    padding: 1em 0;
    white-space: nowrap;
    margin: 0 auto;
    text-align: center;
  }
  section.tree ul::after {
    content: "";
    display: table;
    clear: both;
  }

  section.tree li {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    list-style-type: none;
    position: relative;
    padding: 1em 0.5em 0 0.5em;
  }
  section.tree li::before, section.tree li::after {
    content: "";
    position: absolute;
    top: 0;
    right: 50%;
    border-top: 1px solid #ccc;
    width: 50%;
    height: 1em;
  }
  section.tree li::after {
    right: auto;
    left: 50%;
    border-left: 1px solid #ccc;
  }
  section.tree li:only-child::after, section.tree li:only-child::before {
    display: none;
  }
  section.tree li:only-child {
    padding-top: 0;
  }
  section.tree li:first-child::before, section.tree li:last-child::after {
    border: 0 none;
  }
  section.tree li:last-child::before {
    border-right: 1px solid #ccc;
    border-radius: 0 5px 0 0;
  }
  section.tree li:first-child::after {
    border-radius: 5px 0 0 0;
  }

  section.tree ul ul::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    border-left: 1px solid #ccc;
    width: 0;
    height: 1em;
  }
---

# Tree Diagram

<!-- _class: tree -->

- 24
  - 6
    - 3
    - 2
  - 4
    - 2
    - 2
