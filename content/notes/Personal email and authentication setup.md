Authentication and email are linked together because email is still my main authentiation method, for good reasons.

### Reduce impact of data breaches 
Data breaches occur almost on weekly basis and show how bad many companies are with keeping personal data private. Some companies even sell my data to advertisers. The impact on consumers can range from receiving phishing emails to identity fraud.
As a consumer it's hard to protect against this. Some data is unfortunately static, like e.g. my home address. However data like emails and passwords can be unique per website.

What I can do:
- Never reuse passwords by using a password manager
- Never reuse email addresses by using burner email addresses
- Avoid websites that need my address, birth date, phone number or location if not necessary

### Burner emails
So far I've used a main email address and some "spam" email addresses. 

My spam email address domain is currently owned by my email provider. That means I need to change all websites where I use that email address when i want to switch.

However when using always the same email address, I'm still reusing that email address across websites. I should improve this by using random emails. A common way to do this is to use labels like name+label@domain.tld. However it's easy to guess the actual email address. Instead I should use [random]@some.tld.

### Authentication
Third-party logins like Apple, Facebook, GitHub and Google are great to avoid passwords. Data that is not available, can't be leaked. However, they also lock me in with the vendor. This is very risky as a data breach or a company going out of business can have a large impact. With some third-party logins not only the login is created but also personal data is shared. Often can't adjust the shared data per website. I get to choose to either share what the website asks or don't sign up.

For that reason, password or email logins are still the most private and vendor-lock free authentication method.

### Setup Requirements
- **Privacy**: Support for burner email addresses
- **Domain**: I should be free to change the provider, using a custom domain
- **UX**: Good integration into browsers and operating systems
- **Cost**: Paid but low cost. Free means my data is the product
- **Security**: All setups need to have OTP support. No comparison needed, this is conditional.
- **Relevancy**: Good spam filtering. No comparison needed, all email providers do a good job nowadays.

### Setup Comparison

| Provider             | Burner | No lock-in | UX  | Cost   |
| -------------------- | ------ | ---------- | --- | ------ |
| 1Password + DF (now) | ❌     | ❌         | ❌  | 💰💰   |
| 1Password + fastmail | 👌     | ❌         | 👌  | 💰💰💰 |
| iCloud+              | 👌     | ❌         | 👌  | 💰     |

- My current solution feels too expensive and I'm locked-in with the spam email domain owned by the email provider
- The upcoming 1Password 8 forces me to use their account and iCloud sync will be removed. The advantage of choosing how 1Password syncs is gone. Fastmail and 1Password collaborate to provide burner emails. When switching email providers I loose all burner emails, I'm bound to Fastmail. The 1Password 7 upgrade already annoyed me by forcing their subscription model. For personal use, I don't see a future in 1Password. 
- iCloud is a lot cheaper than others because I already pay for storage of files, photos, backup etc and now it supports custom domains. "Hide My Email" can be used for any purpose and is different than the functionality within "Sign In with Apple". When switching email providers I keep the burner emails only if I keep paying for iCloud, but that I'd do anyway.
	- Can I use Keychain instead of 1Password? Apple added OTP support and improved password management. Is the UX good enough?
	- Lock-in to the Apple eco-system gets even higher
	- Would I switch away from iCloud?
- How about my own burner email domain with a catch all forward to my normal email?

### Sources
- [Hide emails with 1Password + fastmail](https://gizmodo.com/1password-will-now-let-you-hide-your-email-for-logins-1847758333)
- [Fastmail custom burner domains](https://www.fastmail.help/hc/en-us/articles/4406536368911-Masked-Email#domain)


#published
