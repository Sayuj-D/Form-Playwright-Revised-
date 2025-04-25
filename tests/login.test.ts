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

test("entry check", async ({ page }) => {
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

  expect(user.username).toBe("Playwright");
  expect(user.email).toBe("playwright@gmail.com");
  expect(user.password).toBe("play_wright");

  await page.waitForTimeout(1000);

  expect(page.url()).toBe("http://localhost:3000/LogIn");

  await page.getByPlaceholder("Email").fill("playwright@gmail.com");
  await page.getByPlaceholder("Password").fill("play_wright");

  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForTimeout(1000);

  await page.waitForURL("http://localhost:3000/Home");

  await page.pause();
});
