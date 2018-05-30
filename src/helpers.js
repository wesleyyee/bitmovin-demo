const scriptsStore = {};
const head = document.getElementsByTagName('head')[0];

const noop = () => {};
const loadScript = path => new Promise(res => {
  if (!head) { return; }
  const script = document.createElement('script');
  script.src = path;
  script.addEventListener('load', res);
  head.appendChild(script);
  // eslint-disable-next-line no-console
}).catch(error => console.error(`Failed to load path [${path}]: ${error}`));

export const load = path => (
  scriptsStore[path]
    || (scriptsStore[path] = loadScript(path)));

export const loadAll = (list, callback) => (
  Promise
    .all(list.map(load))
    .then(callback || noop));

export default load;
