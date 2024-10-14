![Branches](./coverage/badge-branches.svg)
![Lines](./coverage/badge-lines.svg)
![Functions](./coverage/badge-functions.svg)
![Statements](./coverage/badge-statements.svg)

## Overview

This ESLint rule, `no-direct-init`, forbids the direct initialization, `new`  of specified classes.
The purpose is to enforce project specific rules that may be to use factory methods or other patterns.

## Installation
Install via your favorite package manager, for example:

```bash
npm install eslint-plugin-no-direct-init
```


## Configuration

```js
"no-direct-init/no-direct-init": ["error", ["ForbiddenClass1", "ForbiddenClass2"]]
```