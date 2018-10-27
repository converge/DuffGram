const {Builder, By, Key, until} = require('selenium-webdriver');
let username = ''
let password = ''

async function login(browser) {

    await browser.get('https://www.instagram.com')
    const link_login = await browser.wait(until.elementLocated(By.xpath("//article/div[2]/div[2]/p/a")))
    await link_login.click()
    await browser.sleep(5000)

    const input_username = await browser.wait(until.elementLocated(By.xpath("//input[@name='username']")))
    await input_username.sendKeys(username)
    await browser.sleep(3000)

    const input_password = await browser.wait(until.elementLocated(By.xpath("//input[@name='password']")))
    await input_password.sendKeys(password)
    await browser.sleep(3000)

    const button_login = await browser.wait(until.elementLocated(By.xpath("//article/div/div[1]/div/form/div[3]/button"))) 
    await button_login.sendKeys(Key.RETURN)
    await browser.sleep(5000)
}

async function collect_profile_data(browser) {
    await browser.get(`https://www.instagram.com/${username}`)
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

    let user_data = {
	total_posts: total_posts,
	followers: followers,
	followings: followings
    }
    // return scraped data when end function
    return new Promise((resolve, reject) => {
	resolve(user_data)
    })
}

async function loadProfileScraper(user, passwd) {
    // set global credentials
    username = user
    password = passwd
    // load browser
    const browser = await new Builder().forBrowser('firefox').build();
    // login
    await login(browser)
    // scrape data from profile
    let data = await collect_profile_data(browser)
    await closeDriver(browser)
    // create a new promise, when everything is ready, return the scrape
    // result comming from collect_profile_data
    return new Promise((resolve, reject) => {
	resolve(data)
    })
}

async function closeDriver(browser) {
    await browser.quit()
}

export { loadProfileScraper }
