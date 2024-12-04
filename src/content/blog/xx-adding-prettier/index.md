---
title: "Adding Prettier to Your Project"
description: "How to add Prettier to your project."
publicationDate: 2024-07-01
draft: true
---

[Prettier](https://prettier.io/) is an opinionated code formatter that automatically enforces consistent style rules for code, reducing formatting errors and improving readability.

Maintaining consistent code style across a project can be challenging, especially when working in a team. Enter [Prettier](https://prettier.io/), an opinionated code formatter that automatically formats your code to ensure consistency. Let's explore how to add it to our node-based projects.

## Installation

First, install Prettier locally:

<div id="buttons">
<button class="tablink" onclick="openPage('Tab1', this, 'var(--color-primary)')" id="defaultOpen">npm</button>
<button class="tablink" onclick="openPage('Tab2', this, '#D4AF37')">yarn</button>
<button class="tablink" onclick="openPage('Tab3', this, '#8f2172')">pnpm</button>
<button class="tablink" onclick="openPage('Tab4', this, '#0b6a21')">bun</button>
</div>

<div id="Tab1" class="tabcontent">

```
npm install --save-dev --save-exact prettier
```

</div>

<div id="Tab2" class="tabcontent">

```sh
yarn add --dev --exact prettier
```

</div>

<div id="Tab3" class="tabcontent">

```sh
pnpm add --save-dev --save-exact prettier
```

</div>

<div id="Tab4" class="tabcontent">

```sh
bun add --dev --exact prettier
```

</div>

Then, create an empty configuration file to let code editors and other tools know you are using Prettier:

```sh
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

Alternatively, if you want an example, here's one I use:

```json
{
  "$schema": "https://json.schemastore.org/prettierrc.json",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "quoteProps": "consistent",
  "trailingComma": "none",
  "bracketSpacing": false,
  "bracketSameLine": true,
  "arrowParens": "always",
  "proseWrap": "never",
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto",
  "singleAttributePerLine": false,
  "overrides": [
    {
      "files": ".prettierrc",
      "options": {
        "parser": "json"
      }
    }
  ]
}
```

Refer to Prettier's documentation on the [Configuration File](https://prettier.io/docs/en/configuration).

Next, create a `.prettierignore` file to let Prettier CLI and code editors know which files and directories to _not_ format. For example:

```plaintext
build
public
package-lock.json
```

This example would have Prettier ignore the `build`, the `public` directories, and the `package-lock.json` file.

Now you can format all files with Prettier using:

<div id="buttons">
<button class="tablink2" onclick="openPage2('Tab10', this, 'var(--color-primary)')" id="defaultOpen2">npm</button>
<button class="tablink2" onclick="openPage2('Tab20', this, '#D4AF37')">yarn</button>
<button class="tablink2" onclick="openPage2('Tab30', this, '#8f2172')">pnpm</button>
<button class="tablink2" onclick="openPage2('Tab40', this, '#0b6a21')">bun</button>
</div>

<div id="Tab10" class="tabcontent2">

```sh
npx prettier . --write
```

</div>

<div id="Tab20" class="tabcontent2">

```sh
yarn prettier . --write
```

</div>

<div id="Tab30" class="tabcontent2">

```sh
pnpm exec prettier . --write
```

</div>

<div id="Tab40" class="tabcontent2">

```sh
bun prettier . --write
```

</div>

## Adding Scripts to Format the Entire Codebase

We can create scritps inside the `package.json` file to make it easier for us to check and format the entire codebase with a simple npm/pnpm/yarn/bun command.

Inside your `package.json` add the following scripts to check and format the codebase with Prettier.

```json
"scripts": {
    "check": "npx prettier . --check",
    "format": "npx prettier . --write"
}
```

And just like that, you can use:

<div id="buttons">
<button class="tablink3" onclick="openPage3('Tab100', this, 'var(--color-primary)')" id="defaultOpen3">npm</button>
<button class="tablink3" onclick="openPage3('Tab200', this, '#D4AF37')">yarn</button>
<button class="tablink3" onclick="openPage3('Tab300', this, '#8f2172')">pnpm</button>
<button class="tablink3" onclick="openPage3('Tab400', this, '#0b6a21')">bun</button>
</div>

<div id="Tab100" class="tabcontent3">

```sh
# Check for formatting errors
npm run check

# Fix formatting errors
npm run format
```

</div>

<div id="Tab200" class="tabcontent3">

```sh
# Check for formatting errors
yarn run check

# Fix formatting errors
yarn run format
```

</div>

<div id="Tab300" class="tabcontent3">

```sh
# Check for formatting errors
pnpm run check


# Fix formatting errors
pnpm run format
```

</div>

<div id="Tab400" class="tabcontent3">

```sh
# Check for formatting errors
bun run check

# Fix formatting errors
bun run format
```

</div>

<script>
function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";
  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
</script>

<script>
function openPage2(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent2" by default */
  var i, tabcontent2, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent2");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink2");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";
  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}
// Get the element with id="defaultOpen2" and click on it
document.getElementById("defaultOpen2").click();
</script>

<script>
function openPage3(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent3" by default */
  var i, tabcontent3, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent3");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink3");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";
  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}
// Get the element with id="defaultOpen3" and click on it
document.getElementById("defaultOpen3").click();
</script>

<script>
var paragraph = document.getElementById("paragraph");
var words = paragraph.textContent.split(" ");
var firstWord = words[0];

var span = document.createElement("span");
span.classList.add("first-word"); // Apply the CSS class to the span
span.textContent = firstWord;

// Use regular expression with word boundary to ensure only the first occurrence is replaced
paragraph.innerHTML = paragraph.innerHTML.replace(new RegExp("\\b" + firstWord + "\\b"), span.outerHTML);
</script>
