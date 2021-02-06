# simple-graphql-server

Runs a graphql server on port 8080. Start the dev server with:

```bash
npm i && npm run dev
```

Visit http://localhost:8080/graphql

example requests:

```
query getAll {
  books{
    title
    author
  }
}

mutation print {
  printMessage(message: "hello")
}
```

Also test using curl with:
```bash
curl \
-X POST \
-H "Content-Type: application/json" \
--data '{ "query": "mutation { printMessage(message: \"hello\") }" }' \
http://localhost:8080/
```