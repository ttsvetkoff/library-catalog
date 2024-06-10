const {test, expect } = require('@playwright/test')

test('Verify "All Books" link is visible', async({page})=>{
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const AllBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await AllBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
})

test('Verify "Login" button link is visible', async({page})=>{
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();
    expect(isLoginButtonVisible).toBe(true);
})

test('Verify "Register" button link is visible', async({page})=>{
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonVisible = await registerButton.isVisible();
    expect(isRegisterButtonVisible).toBe(true);
})

test('Verify "All Books" link is visible after user login', async({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    const AllBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await AllBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
})

test('Verify "My Books" link is visible after user login', async({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    const MyBooksLink = await page.$('a[href="/profile"]');
    const isLinkVisible = await MyBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
})

test('Verify "Add Books" link is visible after user login', async({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    const AddBooksLink = await page.$('a[href="/create"]');
    const isLinkVisible = await AddBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
})

test('Verify "Email" is visible after user login', async({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    var email = "Welcome, peter@abv.bg";
    console.log(email)
})

test('Login with valid creds', async({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');

})

test('Login with empty creds', async({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.click('input[type="submit"]');
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
})

test('Login with empty pass', async({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
})


test('Login with empty email', async({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
})

test('register with valid creds', async({page})=>{
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'test@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');
})

test('register with empty creds', async({page})=>{
    await page.goto('http://localhost:3000/register');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/register');
})

test('register with empty email', async({page})=>{
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/register');
})

test('register with empty pass', async({page})=>{
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'test@abv.bg');
    //await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/register');
})

test('register with empty confirm pass', async({page})=>{
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'test@abv.bg');
    await page.fill('input[name="password"]', '123456');
    //await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/register');
})

test('register with diff pass', async({page})=>{
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'test@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '1234567');
    await page.click('input[type="submit"]');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/register');
})

test('Add book with correct data',async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]','peter@abv.bg');
    await page.fill('input[name="password"]','123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'TestBook');
    await page.fill('#description', 'This is some random shit');
    await page.fill('#image', 'https://example.com/random-shit.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    await page.waitForURL('http://localhost:3000/catalog');
    expect(page.url()).toBe('http://localhost:3000/catalog');
})

test('Add book with empty title',async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]','peter@abv.bg');
    await page.fill('input[name="password"]','123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    //await page.fill('#title', 'TestBook');
    await page.fill('#description', 'This is some random shit');
    await page.fill('#image', 'https://example.com/random-shit.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
})

test('Add book with description',async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]','peter@abv.bg');
    await page.fill('input[name="password"]','123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'TestBook');
    //await page.fill('#description', 'This is some random shit');
    await page.fill('#image', 'https://example.com/random-shit.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
})

test('Add book with image URL',async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]','peter@abv.bg');
    await page.fill('input[name="password"]','123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'TestBook');
    await page.fill('#description', 'This is some random shit');
    //await page.fill('#image', 'https://example.com/random-shit.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    page.on('dialog',async dialog=>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })
    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
})

test('Login and verify all books are displayed',async ({page})=>{
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]','peter@abv.bg');
    await page.fill('input[name="password"]','123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.waitForSelector('.dashboard');
    const bookElements = await page.$$('.other-books-list li');
    //console.log(bookElements)
    expect(bookElements.length).toBeGreaterThan(0);
})

// test('Login and navigate to details page',async ({page})=>{
//     await page.goto('http://localhost:3000/login');
//     await page.fill('input[name="email"]','peter@abv.bg');
//     await page.fill('input[name="password"]','123456');
//     await Promise.all([
//         page.click('input[type="submit"]'),
//         page.waitForURL('http://localhost:3000/catalog')
//     ]);
//     await page.click('a[href="/catalog"]');
//     await page.waitForSelector('.otherBooks');
//     await page.click('otherBooks a.button');
//     await page.waitForSelector('.book-information');
//     const detailsPageTitle = await page.textContent('.book-information h3');
//     expect(detailsPageTitle).toBe('Test Book');

// })

//THE REST OF THE GUI TESTS I JUST CBA