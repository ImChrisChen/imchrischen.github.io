---
title: Node发送邮件
date: 2019-06-12 14:53:39
tags:
- NodeJS
---
<!--# Node 发送邮件-->

### 安装NPM模块

```shell
npm install nodemailer --save
```



### 简陋的实现

```javascript
const NodeMailer = require('nodemailer');     //@modules  npm install nodemailer

// 开启一个 SMTP 连接池
let transporter = NodeMailer.createTransport({
	service: 'qq',
	post: 465,          			// SMTP 端口
	secureConnection: true,         // SSL
	auth: {
		user: '309129685@qq.com',
		pass: 'xxxxxxxxxxxxx',  	// SMTP 授权码, 需要在邮箱设置中开启SMTP服务
	}
});

// 设置邮件内容
let mailOptions = {
	from: '309129685@qq.com',               // 发件地址
	to: 'chris_chen1997@163.com',           // 收件地址
	subject: 'Title',             			// 标题
	text: 'Hello ChrisChen',            	// text | html 只能选择一种作为内容
	// html: '<h1>Hello ChrisChen</h1>'
};

// 发送邮件
transporter.sendMail(mailOptions, function (err, info) {
	if (err) throw err;
	console.log(info);
	transporter.close();            // 关闭连接池
});

```
