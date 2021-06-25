---
title: 配置vim下nginx语法高亮

date: 2021-06-25 13:31:37

tags:
  - nginx
  - 配置

---

## 下载vim高亮语法配置

```shell

cd ~/.vim/syntax/

wget http://www.vim.org/scripts/download_script.php?src_id=14376 -O nginx.vim
```

## 修改filetype.vim 配置

在 `~/.vim/filetype.vim` 文件中添加如下配置

```text
" nginx 
au BufNewFile,BufRead /usr/local/etc/nginx setf nginx
```

`/usr/local/etc/nginx` 为你的nginx路径
