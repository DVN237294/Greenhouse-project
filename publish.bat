@echo off
SET "scriptPath=%~dp0"
SET "scriptPath=%scriptPath::=%"
SET "scriptPath=%scriptPath:\=/%"
SET "scriptPath=%scriptPath:~2,-1%"
ubuntu run "rsync -e 'ssh -i /mnt/c/Users/%USERNAME%/.ssh/id_rsa' -ruv '/mnt/c/%scriptPath%' %USERNAME%@192.168.7.2:/home/%USERNAME%/"
