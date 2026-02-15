GET {{host}}/health
HTTP 200
[Asserts]
jsonpath "$.status" == "ok"
