var server=window.location.href;
var server_array=server.split('/')
var server_new_array = server_array[2].split(':');


export const server_name="https://"+server_new_array[0]+'/';
export const api_url="https://"+server_new_array[0]+"/api";  
export const api_url_="https://"+server_new_array[0]+"/";  
export const userapi_url="https://"+server_new_array[0]+"/userapi";
export const media_url="https://assets.careerqualifyed.com";
