---
title: Git常用命令
date: 2019-06-12 14:32:38
tags:
- Git
---
<!--# Git常用命令-->

![git三个分区](http://pt2rf9y1b.bkt.clouddn.com/Markdown/git_three_rigon.png)

### Git基本操作

| 操作                           | 命令                                          |
| :----------------------------- | :-------------------------------------------- |
| 将工作区的修改提交到暂存区     | git add <文件名>  可用通配符                  |
| 将暂存区的修改提交到当前分支   | git commit -m <注释>                          |
| 修改最后一次提交的注释信息     | git commit —amend -m <注释>                   |
| 显示有变更的文件               | git status                                    |
| 查看修改差异                   | git diff                                      |
| 提交一个新的版本，并重写注释   | git revert <hash版本号>    版本回退常用       |
| 回滚到指定版本 (慎用)          | git reset <hash版本号> 之前的提交记录会消失   |
| 把指定文件从暂存区撤销到工作区 | git reset HEAD <文件名>    可用通配符         |
| 撤销工作区的修改               | git checkout <文件名>       可用通配符代替    |
| 推送代码到远程分支             | git push origin <远程分支> 加 -f 强推直接覆盖 |



### 远程仓库相关命令

| 操作         | 命令                                                    |
| :----------- | ------------------------------------------------------- |
| 检出仓库     | git clone <远程仓库地址>                                |
| 查看远程仓库 | git remote -v                                           |
| 添加远程仓库 | git remote add <远程仓库名称> <远程仓库地址>            |
| 删除远程仓库 | git remote rm <远程仓库名称>                            |
| 修改远程仓库 | git remote set-url --push <远程仓库名称> <远程仓库地址> |
| 拉取远程仓库 | git pull <远程仓库名称> <本地分支名称>                  |
| 推送远程仓库 | git push <远程仓库名称> <本地分支名称>:<远程分支名>     |

### 分支相关命令

| 操作              | 命令                                                  |
| ----------------- | ----------------------------------------------------- |
| 查看本地分支      | git branch                                            |
| 查看远程分支      | git branch -r                                         |
| 创建本地分支      | git branch <分支名称>                                 |
| 切换分支          | git checkout <分支名称>                               |
| 切换/创建本地分支 | git checkout -b <分支名称>   切换本地分支，没有则创建 |
| 删除本地分支      | git branch -d <分支名称>    需要切换到其他分支        |
| 合并分支          | git merge <分支名称>     当前分支和 <分支名称>合并    |
| 创建远程分支      | git push origin <本地分支名称>                        |
| 删除远程分支      | git push origin :<远程分支名称>                       |



### 版本(tag)操作相关命令

| 操作                    | 命令                                        |
| ----------------------- | ------------------------------------------- |
| 查看版本                | git tag                                     |
| 创建版本                | git tag [name]                              |
| 删除版本                | git tag -d [name]                           |
| 查看远程版本            | git tag -r                                  |
| 创建远程版本            | git push origin [name]   本地版本push到远程 |
| 删除远程版本            | git push origin :refs/tags/[name]           |
| 合并远程仓库的tag到本地 | git pull origin --tags                      |
| 上传本地tag到远程仓库   | git push origin --tags                      |
| 创建带注释的tag         | git tag -a [name] -m 'yourMessage'          |

