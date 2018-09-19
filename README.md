## Serverless Node Mailer
A lambda function to send emails by lambda invoke with [handlebars](http://handlebarsjs.com/) support.

### Deploy
```bash
git clone https://github.com/svtek/serverless-node-mailer.git
cd serverless-node-mailer
serverless deploy -s prod
```

### Ruby Invoke Example

```ruby
  client = Aws::Lambda::Client.new

  req_payload = {
    options:   { email_from: 'test@example.com', email_to: 'to-test@example.com' }.to_json,
    variables: { name: 'John', click_url: 'https://example.com' }.to_json,
    smtp:      { address: 'smtp.gmail.com', port: "465", username: 'test', paasword: 'test' }.to_json,
    subject:   "Hi {{name}}! This is an email subject!",
    content:   "<p>HTML template with handlebars support. <a href="{{click_url}}">Click here</a></p>"
  }

  @payload = JSON.generate(req_payload)

  resp = client.invoke({
    function_name: 'serverless-node-mailer-prod-notifier',
    invocation_type: 'RequestResponse',
    log_type: 'None',
    payload: @payload
  })
```

Payload options also support: `cc`, `bcc` and `reply_to`.
