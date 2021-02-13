# Repply

Repply te permite generar respuestas a partir de algunos datos

## Instalación

`npm i repply` o `yarn add repply`

```js
const repply = require('repply');
```
## Mediante CDN

```html
// Fuse.js
<script src="https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.min.js"></script>
// Replyjs
<script src="https://cdn.jsdelivr.net/npm/repply/dist/repply.min.js"></script>
```

## Uso

````js
var newData = [
	{
		text: ["Hola mundo",  "ola mundo"],
		reply: ["Hola mundo!"]
	},
];
var result = repply('Hola mundo', {
	data: newData,
	default_data: false,
	error_message: 'Error'
});
// El resultado será: Hola mundo!
console.log(result);
```