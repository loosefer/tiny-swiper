const path = require('path')
const expect = require('expect')
const puppeteer = require('puppeteer')
const createServer = require('./createServer')

const server = createServer()
const globalVariables = {
    browser: global.browser,
    expect: global.expect,
    entryPath: global.entryPath
}
const opts = {
    devtools: process.env.TEST_MODE === 'local',
    timeout: 10000,
    slowMo: 20,
    defaultViewport: {
        width: 400,
        height: 770,
        isMobile: true
        // isLandscape: true
    }
}

before(async function () {
    this.timeout(10000)
    global.expect = expect
    global.browser = await puppeteer.launch(opts)
    global.entryHost = `http://localhost:${server.address().port}/`
    global.entryPath = `http://localhost:${server.address().port}/test/fixtures/index.html`
})

after(async function () {
    if (process.env.TEST_MODE !== 'local') {
        server.close()
        await browser.close()
    }
    global.browser = globalVariables.browser
    global.expect = globalVariables.expect
    global.entryPath = globalVariables.entryPath
})
