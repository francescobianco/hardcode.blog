
deploy:
	hugo -D
	git add .
	git commit -am "deploy"
	git push
