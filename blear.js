/**
 * (c) 2015 Jaden Dessureault
 * This code is licensed under MIT license (see LICENSE for details) 
 */
var Blear = function(element, options) {
  var self = this;

  self.elements = {
    main: element
  };

  self.setOptions(options);

  // Create nodes
  self.createElements();

  // Add styles
  self.stylize();

  // Update render when window is scrolled
  window.onscroll = function() {
    self.update();
  };
};

/**
 * Set options using defaults
 * and custom values
 * 
 * @param {Object} options
 * - custom options to override
 */
Blear.prototype.setOptions = function(options) {
  var _default = {
    radius: 20,
    background: '#ffffff',
    opacity: 0.6,
    wrapper: '.blear-wrap',
    blur: '.blear'
  };

  options = options || {};

  for (var prop in options) {
    if (options.hasOwnProperty(prop)) {

      // Override the default setting
      _default[prop] = options[prop]
    }
  }

  this.options = _default;
};

/**
 * Convert a hex value into rgb
 * 
 * @param {String} hex
 * - the hex value that represents a colour
 * 
 * @return {Array}
 * - the red, green, and blue values
 */
Blear.prototype.convertHex = function(hex) {
  hex = hex.substring(1);

  var bigint = parseInt(hex, 16);
  
  var red    = (bigint >> 16) & 255;
  var green  = (bigint >> 8) & 255;
  var blue   = bigint & 255;

  return red + ',' + green + ',' + blue;
};

/**
 * Create all the needed nodes
 * and insert them into the body
 */
Blear.prototype.createElements = function() {
  var body = document.body.children;

  // Create new wrapper element
  this.elements.wrapper = document.createElement('div');
  this.elements.wrapper.className = this.options.wrapper.substring(1);
  this.elements.wrapper.id = this.elements.main.id + '-' + this.options.wrapper.substring(1);

  // Create background overlay
  this.elements.background = document.createElement('div');
  this.elements.background.id = this.elements.main.id + '-background';

  // Insert wrapper into main
  this.elements.main.appendChild(this.elements.wrapper);
  
  // Insert the background overlay
  this.elements.wrapper.insertBefore(this.elements.background, this.elements.blur);
  
  // Create new blur element
  this.elements.blur = document.createElement('div');
  this.elements.blur.className = this.options.blur.substring(1);
  this.elements.blur.id = this.elements.main.id + '-' + this.options.blur.substring(1);

  // Insert blur into wrapper element
  this.elements.wrapper.appendChild(this.elements.blur);

  for (var el in body) {
    if (body.hasOwnProperty(el)) {

      // Don't want any scripts
      if (body[el].tagName === 'SCRIPT' ||

          // Don't want to contain itself
          body[el] === this.elements.main ||

          // Don't want the wrapper
          body[el] === this.elements.wrapper) continue;

      // Clone each element into the blur element
      this.elements.blur.innerHTML += body[el].outerHTML || '';
    }
  }
};

/**
 * Add CSS to and blur the created nodes
 */
Blear.prototype.stylize = function() {
  var styles = {
    main: {
      overflow: 'hidden'
    },
    background: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: 999,
      background: 'rgba(' + this.convertHex(this.options.background) + ',' + this.options.opacity + ')',
    },
    wrapper: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      zIndex: -1
    },
    blur: {
      position: 'relative',
      webkitFilter: 'blur(' + this.options.radius + 'px)',
      mozFilter: 'blur(' + this.options.radius + 'px)',
      filter: 'blur(' + this.options.radius + 'px)'
    }
  };

  // Loop through the elements
  for (var el in styles) {

    // Loop through the styles
    for (var style in styles[el]) {

      // Set the style
      this.elements[el].style[style] = styles[el][style];
    }
  }
};

/**
 * Update the translation values
 * 
 * @return {Boolean} false
 */
Blear.prototype.update = function() {
  var scrolled = window.scrollY;
  var translation = 'translate3d(0px,' + (-scrolled) + 'px,0px)';

  var styles = {
    webkitTransform: translation,
    mozTransform: translation,
    transform: translation
  };

  for (var style in styles) {
    this.elements.blur.style[style] = styles[style];
  }

  // Prevent any default behaviour/propagation
  return false;
};
