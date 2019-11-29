---
layout: http
title: Http Request、Response报文结构☎️
date: 2019-08-17 12:28:35
tags:
- Http
---
### 常见的请求头(request)字段含义：


|字段|含义|
|----|:---|
|Accept|浏览器可接受的MIME类型|
|Accept-Charset|浏览器可接受的字符集|
|Accept-Encoding|浏览器能够进行解码的数据编码方式，比如gzip。Servlet能够向支持gzip的浏览器返回经gzip编码的HTML页面。许多情形下这可以减少5到10倍的下载时间。|
|Accept-Language|浏览器所希望的语言种类，当服务器能够提供一种以上的语言版本时要用到。|
|Authorization|授权信息，通常出现在对服务器发送的WWW-Authenticate头的应答中。|
|Content-Length|表示请求消息正文的长度|
|Host|主机名|
|If-Modified-Since|资源的缓存时间。只有当所请求的内容在指定的时间后又经过修改才返回它，否则返回304“Not Modified”应答|
|Referer|包含一个URL，用户从该URL代表的页面出发访问当前请求的页面。|
|User-Agent|User-Agent头域的内容包含发出请求的用户信息。浏览器类型，如果Servlet返回的内容与浏览器类型有关则该值非常有用|
|Cookie|客户机通过这个头可以向服务器带数据，这是最重要的请求头信息之一。|
|Connection|处理完这次请求后是否断开连接还是继续保持连接 (HTTP 1.1默认进行持久连接 . 'keep-alive')|
|||
|||
|||
|||
|||
|||



### 常见的响应头字段含义

| 字段              | 含义                                                         |
| ----------------- | :----------------------------------------------------------- |
| Allow             | 服务器支持哪些请求方法(如GET、POST等)。                      |
| Content-Encoding  | 文档的编码(Encode)方法。只有在解码之后才可以得到Content-Type头指定的内容类型。利用gzip压缩文档能够显著地减少HTML文档的下载时间。[Java](https://www.2cto.com/kf/ware/Java/)的GZIPOutputStream可以很方便地进行gzip压缩，但只有Unix上的Netscape和Windows上的IE4、IE5才支持它。因此，Servlet应该通过查看Accept-Encoding头(即request.getHeader(“Accept- Encoding”))检查浏览器是否支持gzip，为支持gzip的浏览器返回经gzip压缩的HTML页面，为其他浏览器返回普通页面。 |
| Content-Length    | 表示内容长度。只有当浏览器使用持久HTTP连接时才需要这个数据。如果你想要利用持久连接的优势，可以把输出文档写入 ByteArrayOutputStram，完成后查看其大小，然后把该值放入Content-Length头，最后通过byteArrayStream.writeTo(response.getOutputStream()发送内容 |
| Content- Type     | 表示后面的文档属于什么MIME类型。Servlet默认为text/plain，但通常需要显式地指定为text/html。由于经常要设置 Content-Type，因此HttpServletResponse提供了一个专用的方法setContentType。 |
| Date              | 当前的GMT时间，例如，Date:Mon,31Dec200104:25:57GMT。Date描述的时间表示世界标准时，换算成本地时间，需要知道用户所在的时区。你可以用setDateHeader来设置这个头以避免转换时间格式的麻烦 |
| Expires           | 告诉浏览器把回送的资源缓存多长时间，-1或0则是不缓存          |
| Last-Modified     | 文档的最后改动时间。客户可以通过If-Modified-Since请求头提供一个日期，该请求将被视为一个条件GET，只有改动时间迟于指定时间的文档才会返回，否则返回一个304(Not Modified)状态。Last-Modified也可用setDateHeader方法来设置。 |
| Location          | 这个头配合302状态码使用，用于重定向接收者到一个新URI地址。表示客户应当到哪里去提取文档。Location通常不是直接设置的，而是通过HttpServletResponse的sendRedirect方法，该方法同时设置状态代码为302。 |
| Refresh           | 告诉浏览器隔多久刷新一次，以秒计                             |
| Server            | 服务器通过这个头告诉浏览器服务器的类型。Server响应头包含处理请求的原始服务器的软件信息。此域能包含多个产品标识和注释，产品标识一般按照重要性排序。Servlet一般不设置这个值，而是由Web服务器自己设置。 |
| Set-Cookie        | 设置和页面关联的Cookie。Servlet不应使用response.setHeader(“Set-Cookie”, …)，而是应使用HttpServletResponse提供的专用方法addCookie |
| Transfer-Encoding | 告诉浏览器数据的传送格式                                     |
| WWW-Authenticate  | 客户应该在Authorization头中提供什么类型的授权信息?在包含401(Unauthorized)状态行的应答中这个头是必需的。例如，response.setHeader(“WWW-Authenticate”, “BASIC realm=\”executives\”“)。注意Servlet一般不进行这方面的处理，而是让Web服务器的专门机制来控制受密码保护页面的访问 |
|                   |                                                              |
|                   |                                                              |
|                   |                                                              |
|                   |                                                              |
|                   |                                                              |
|                   |                                                              |
