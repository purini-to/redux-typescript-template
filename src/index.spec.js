const context = require.context('./app', true, /\.(js|ts|tsx)$/);
console.log(context.keys().filter(name => name.indexOf('.d.ts') === -1));
context.keys().filter(name => name.indexOf('.d.ts') === -1).forEach(context);
