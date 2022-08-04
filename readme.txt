-------- Comandos Usados --------
1° Parte
    node server.js CLUSTER

    forever start server.js 
    forever list

    pm2 start server.js
    pm2 start server.js --name="serverCLUSTER" --watch -i max -- CLUSTER
    pm2 start server.js --name="serverFORK" --watch -- FORK

    pm2 list
    pm2 start 'all'

2° Parte
    pm2 start server.js --name="serverCLUSTER" --watch -i max -- CLUSTER
    pm2 list 

    >>> Configurar archivo nginx.conF
        start nginx
        tasklist /fi "imagename eq nginx.exe"
        ./nginx.exe -s reload

TEST
    node --prof server.js FORK
    Remove-item alias:curl
    curl -X GET "http://localhost:8080/info"
    artillery quick --count 20 -n 50 http://localhost:8080/info > result_fork.txt

    node --prof-process isolate-0000018F13377670-4784-v8.log > reporteProfProcess.txt

    npm start
    curl -X GET "http://localhost:8080/info" 
    npm test    

        