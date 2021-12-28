# backend

## Express API

### JWT

Token with RS256 and and a key length of 4096 bits

Generate RSA Private Key[^1]:

```bash
openssl genpkey -out private-key.pem -algorithm RSA -pkeyopt rsa_keygen_bits:4096
```

Generate RSA Public Key[^1]:

```bash
openssl rsa -in private-key.pem -pubout > public-key.pem
```

[^1]: https://stackoverflow.com/questions/51055884/generate-pkcs8-private-key-with-openssl
