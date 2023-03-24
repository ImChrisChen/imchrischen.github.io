# pem to crt/key





## key

key.pem => cert.key

```shell
openssl pkey -in key.pem -out chrisorz.cn.key
```



### crt 

```shell
openssl x509 -in cert.pem -out chrisorz.cn.crt
```

