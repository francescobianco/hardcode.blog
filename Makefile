
logo:
	curl -o static/images/logo.png -sL https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=Example

server:
	hugo server -D

push:
	git add .
	git commit -am "deploy" || true
	git push

prepare-release:
	rm -fr docs || true
	mv public docs
	echo 'hardcode.blog' > docs/CNAME

deploy:
	rm -fr docs || true
	mkdir docs
	echo 'hardcode.blog' > docs/CNAME
	hugo -d docs
