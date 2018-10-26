const {Builder, By, Key, until} = require('selenium-webdriver');

async function login(browser) {

    await browser.get('https://www.instagram.com')
    // this is correct xpath -> but doesnt work
    // const login_button = await browser.wait(until.elementLocated(By.xpath("//a[text()='Log in']")))
    const link_login = await browser.wait(until.elementLocated(By.xpath("//article/div[2]/div[2]/p/a")))
    await link_login.click()
    await browser.sleep(5000)

    const input_username = await browser.wait(until.elementLocated(By.xpath("//input[@name='username']")))
    await input_username.sendKeys('cycling_apparel')
    await browser.sleep(3000)

    const input_password = await browser.wait(until.elementLocated(By.xpath("//input[@name='password']")))
    await input_password.sendKeys('melissa971')
    await browser.sleep(3000)

    const button_login = await browser.wait(until.elementLocated(By.xpath("//article/div/div[1]/div/form/div[3]/button"))) 
    await button_login.sendKeys(Key.RETURN)
    await browser.sleep(5000)
}

async function collect_profile_data(browser, profile) {
    await browser.get(`https://www.instagram.com/${profile}`)
    await browser.sleep(5000)

    // const total_posts = await browser.wait(until.elementLocated(By.xpath("(//li)[1]/span/span")))
    let total_posts = await browser.wait(browser.findElement(By.xpath("(//li)[1]/span/span")).getText().then(function (text) {
	return text
    }))
    let followers = await browser.wait(browser.findElement(By.xpath("//header/section/ul/li[2]/a/span")).getText().then(function (text) {
	return text
    }))
    let followings = await browser.wait(browser.findElement(By.xpath("//header/section/ul/li[3]/a/span")).getText().then(function (text) {
	return text 
    }))
    await browser.sleep(5000)
    // @todo: add it to a util file
    // not working->
    total_posts = total_posts.replace(/\.g/, '')
    followers = followers.replace(/\.g/, '')
    followings = followings.replace(/\.g/, '')

    console.log(total_posts)
    console.log(followers)
    console.log(followings)
}

async function main() {
    const profile = 'cycling_apparel'
    const browser = await new Builder()
	.forBrowser('firefox')
	.build();

    await login(browser)
    await collect_profile_data(browser, profile)
    await closeDriver(browser)
}

async function closeDriver(browser) {
    await browser.quit()
}

main()
