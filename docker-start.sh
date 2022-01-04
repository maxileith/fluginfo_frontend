[[ -z "${FLUGINFO_BACKEND_BASE_URL}" ]] || echo ${FLUGINFO_BACKEND_BASE_URL} > /usr/share/nginx/html/backendBaseUrl.txt
nginx -g "daemon off;"
