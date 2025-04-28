import { test, expect } from "@playwright/test";

test("goto page", async ({ page }) => {
  await page.goto("http://localhost:3000/SignUp");
  await page.pause();
});

test("data fill test", async ({ page }) => {
  await page.goto("http://localhost:3000/SignUp");
  await expect(page.getByPlaceholder("UserName")).toBeVisible();
  await expect(page.getByPlaceholder("Email")).toBeVisible();
  await expect(page.getByPlaceholder("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Signup" })).toBeVisible();
});

test("check data fill", async ({ page }) => {
  await page.goto("http://localhost:3000/SignUp");

  page.on("toast message test", async (dialog) => {
    expect(dialog.message()).toContain("SignUp Successful!");
    await dialog.dissmiss();
  });

  await page.getByPlaceholder("UserName").fill("Playwright");
  await page.getByPlaceholder("Email").fill("playwright@gmail.com");
  await page.getByPlaceholder("Password").fill("play_wright");

  await page.getByRole("button", { name: "Signup" }).click();
});

test("check data empty", async ({ page }) => {
  await page.goto("http://localhost:3000/SignUp");

  page.on("toast message test", async (dialog) => {
    expect(dialog.message()).toContain("Please fill all the fields!");
    await dialog.dissmiss();
  });

  await page.getByPlaceholder("UserName").fill("Playwright");
  await page.getByPlaceholder("Email").fill("");
  await page.getByPlaceholder("Password").fill("play_wright");

  await page.getByRole("button", { name: "Signup" }).click();

  await page.waitForTimeout(1000);
});

test.only("flow check", async ({ page }) => {
  await page.goto("http://localhost:3000/SignUp");

  page.on("signup check", async (dialog) => {
    expect(dialog.message()).toContain("SignUp Successful!");
    await dialog.dissmiss();
  });

  await page.getByPlaceholder("UserName").fill("Playwright");
  await page.getByPlaceholder("Email").fill("playwright@gmail.com");
  await page.getByPlaceholder("Password").fill("play_wright");

  await page.getByRole("button", { name: "Signup" }).click();

  await page.waitForTimeout(1000);

  const users = await page.evaluate(() => {
    const userData = localStorage.getItem("users");
    return userData ? JSON.parse(userData) : [];
  });
  const user = users.find(
    (existing_user) => existing_user.username === "Playwright"
  );

  // expect(user.username).toBe("Playwright");
  // expect(user.email).toBe("playwright@gmail.com");
  // expect(user.password).toBe("play_wright");

  await page.waitForTimeout(3000);

  expect(page.url()).toBe("http://localhost:3000/LogIn");

  await page.getByPlaceholder("Email").fill("playwright@gmail.com");
  await page.getByPlaceholder("Password").fill("play_wright");

  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForTimeout(2000);

  await page.waitForURL("http://localhost:3000/Home");
  const userData = await page.evaluate(() => {
    return JSON.parse(localStorage.getItem("currentUser"));
  });
  await expect(
    page.getByText(`Welcome to Home page,${userData.username}`)
  ).toBeVisible();

  await page.waitForTimeout(2000);

  await page.getByRole("link", { name: "About Us" }).click();
  await page.waitForURL("http://localhost:3000/AboutUs");

  await page.waitForTimeout(2000);

  await page.getByRole("link", { name: "Contact Us" }).click();
  await page.waitForURL("http://localhost:3000/ContactUs");

  await page.waitForTimeout(2000);

  await page.getByRole("link", { name: "Form" }).click();
  await page.waitForURL("http://localhost:3000/Form");

  await page.waitForTimeout(2000);

  await page.getByRole("textbox", { name: "Full Name" }).fill("Playwright");

  await page
    .getByRole("textbox", { name: "Email" })
    .fill("sayujrumsan@gmail.com");

  await page.getByRole("textbox", { name: "Password" }).fill("Trinity.123?@");

  await page.getByPlaceholder("Date of Birth").fill("1995-08-15");

  await page.check('input[type=radio][value="male"]');

  await page.getByText("Coding").check();
  await page.getByText("Design").check();

  await page.selectOption("select", { label: "Nepal" });

  await page
    .getByRole("textbox", { name: "Tell us about yourself" })
    .fill("This is a playwright test.");

  await page.getByRole("button", { name: "Submit" }).click();

  await page.waitForTimeout(5000);

  await page.getByRole("button", { name: "Logout" }).click();
  await page.waitForURL("http://localhost:3000/LogIn");

  await page.goto("http://localhost:3000/Home");
  await expect(page).toHaveURL("http://localhost:3000/LogIn");

  await page.pause();
});
