const context = require.context('./app', true, /\.(js|ts|tsx)$/);
context.keys().filter(name => name.indexOf('.d.ts') === -1).forEach(context);
