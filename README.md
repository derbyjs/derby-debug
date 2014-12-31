# derby-debug

Derby app plugin to add debugging utility functions.

## Usage

```
app.use(require('derby-debug'));
```

## Globals

When included, this plugin will set `window.APP` and `window.MODEL` in the browser when the application is ready. These make debugging from the console much easier.

## App methods

### `app.findComponent(name, [index])`

Returns a component with a given view name. This is the same name that is shown in the comment representing the component instance when you inspect the DOM with the console's Elements Panel. An `index` may be optionally passed to return the nth component on the page.

### `app.componentCommand(comment)`

Returns a command that can be entered into the console to find the same component again. This is handy for the following workflow:

1. Right click to inspect an element close to the component that you wish to debug
2. Click on the comment for the appropriate component in the Elements panel
3. Switch to the Console panel
4. In the Chrome console, enter `copy(APP.componentCommand($0))`
5. Paste the command into the console and press Enter
6. Now you can inspect the component, get values from it, or add debugging commands

`copy()` and `$0` are features of the Chrome console. Naturally, `copy()` copies a value to the clipboard, and `$0` returns the node that is currently selected in the Elements panel.

## Model methods

### `model.logEvents([subpath])`

This method adds an event listener that console.logs out the arguments of any model event. A subpath argument is optional.

For example, try:

```
MODEL.logEvents();
MODEL.logEvents('_page');
app.findComponent('my-component:index').model.logEvents();
```
