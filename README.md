npm audit fix# AuroraESP8266Web

npm pack ../react-stockcharts/build ../react-dynamic-grid-layout/build
npm install react-grid-layout-0.14.5.tgz  react-stockcharts-0.7.8.tgz

openssl req -new -sha256 \
    -out private.csr \
    -key private.key \
    -config ssl.conf 
    
openssl req -new -key private.key -out private.csr

openssl x509 -req \
    -days 3650 \
    -in private.csr \
    -signkey private.key \
    -out private.crt \
    -extensions req_ext
    
openssl req -new > cert.csr
openssl rsa -in privkey.pem -out key.pem
openssl x509 -in cert.csr -out cert.pem -req -signkey key.pem -days 1001
cat key.pem>>cert.pem

openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
