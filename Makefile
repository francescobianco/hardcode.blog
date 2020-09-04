
logo:
	curl -o static/images/logo.png -sL https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=Example

server:
	hugo server -D

deploy:
	hugo -D -d docs
	git add .
	git commit -am "deploy" || true
	git push
