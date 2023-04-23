target=/Users/chrisorz/Code/chrisorz.cn/imchrischen.github.io

cp -r /Users/chrisorz/Code/chrisorz.cn/blog.chrischen.top/public/* $target

cd $target

git add .
git commit -m "update blog"
git push origin master

