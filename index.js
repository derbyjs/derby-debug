
module.exports = function(app) {
  app.on('ready', function(page) {
    window.MODEL = page.model;
    window.APP = app;
    app.findComponent = findComponent;
    app.componentCommand = componentCommand;
    app.derby.Model.prototype.logEvents = logEvents;
  });
}

function findComponent(name, index) {
  if (index == null) index = 0;
  var commentIterator = document.createTreeWalker(document, 128, null, false);
  var node;
  while ((node = commentIterator.nextNode())) {
    if (node.data !== name) continue;
    if (index === 0) {
      return node.$component;
    }
    index--;
  }
};

function componentCommand(comment) {
  var count = 0;
  var commentIterator = document.createTreeWalker(document, 128, null, false);
  var node;
  while ((node = commentIterator.nextNode())) {
    if (node === comment) {
      return '(component = APP.findComponent(\'' + node.data + '\',' + count + '))';
    }
    if (node.data === comment.data) count++;
  }
};

function logEvents(path) {
  if (path == null) path = '';
  this.on('all', path + '**', console.log.bind(console));
};
