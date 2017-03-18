declare var require: any;
const context = require.context('./app', true, /\.(js|ts|tsx)$/);
context.keys().filter(filterDefines).forEach(context);

function filterDefines(name: string) {
    return name.indexOf('.d.ts') === -1;
}
