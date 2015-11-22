# Blear

A simple JavaScript plugin to recreate the iOS7 style blurry header. Check out the demo at [jaden.io/blear](http://jaden.io/blear) (*works best in Safari*).

## Gettings Started

Reference either `blear.js` or `blear.min.js` just before the end of the `body` tag.

```html
    <script src="blear.js"></script>
  </body>
</html>
```

Create a new instance of *Blear* and pass in the element as the first parameter.

```js
<script>
  var header = document.getElementById('main-header');

  var blear = new Blear(header);
</script>
```

## API

### Blear(element, [options])

#### element

Type: `Node object`

#### options

##### radius

Type: `integer`  
Default: `20`

Pixel representation if the blur radius.

##### background

Type: `string`  
Default: `#ffffff`

Hash color code for the element's background.

##### opacity

Type: `decimal`  
Default: `0.6`

Opacity value from 0.0 to 1.0.

##### wrapper

Type: `string`  
Default: `.blear-wrap`

The CSS class for the wrapper element. Must be prefixed with `.`

##### blur

Type: `string`  
Default: `.blear`

The CSS class for the blur element. Must be prefixed with `.`

## License

MIT © Jaden Dessureault. See [LICENSE](LICENSE) for details.
