
logo:
	curl -o static/images/logo.png -sL https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=Example

server:
	hugo server -D

push:
	git add .
	git commit -am "deploy" || true
	git push

prepare-release:
	cp -R public/* docs/
	echo 'hardcode.blog' > docs/CNAME
	sed -i "s/> Last update:.*/> Last update: $(shell date)/" README.md

deploy:
	rm -fr docs || true
	mkdir docs
	echo 'hardcode.blog' > docs/CNAME
	hugo -d docs
	make -s push

github-discussion-categories:
	@curl \
		-X POST https://api.github.com/graphql \
		-H "Authorization: bearer $$GITHUB_TOKEN" \
		-H "Content-Type: application/json" \
		-d '{"query": "query { repository(owner: \"francescobianco\", name: \"hardcode.blog\") { discussionCategories(first: 20) { nodes { id name isAnswerable slug } } } }"}'
