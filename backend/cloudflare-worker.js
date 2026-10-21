import {handleApi} from './lib/fedoracing-api.js';
export default {async fetch(request,env){return new URL(request.url).pathname.startsWith('/api/')?handleApi(request,env):env.ASSETS.fetch(request);}};
