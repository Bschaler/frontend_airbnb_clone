import Cookies from 'js-cookie';
const apiUrl = import.meta.env.PROD ? '' : '';

export async function csrfFetch(url, options = {}) {
  const fullUrl = `${apiUrl}${url}`;
    options.method = options.method || 'GET';
    options.headers = options.headers || {};
      options.credentials = 'include';
   
    if (options.method.toUpperCase() !== 'GET') {
      
         options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
          options.headers['XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
      }
     
      const res = await window.fetch(fullUrl, options);

      if (res.status >= 400) throw res;
      return res;
    }

    export function restoreCSRF() {
        return csrfFetch('/api/csrf/restore');
      }