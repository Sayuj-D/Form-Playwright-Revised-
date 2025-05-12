import { test, expect } from "@playwright/test";

var userid;

test("Get users - GET", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users?page=2");
  console.log(await response.json());

  const text = await response.text();
  expect(text).toContain("Michael");
  expect(text).toContain("lindsay.ferguson@reqres.in");

  expect(response.status()).toBe(200);
});

test("Get users fail test", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/usr?page=2");
  expect(response.status()).toBe(401);
});

test("Create users - POST", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/users", {
    data: {
      name: "Sayujya",
      job: "Intern",
    },

    headers: {
      "x-api-key": "reqres-free-v1",
      // negative case test done
      "Content-Type": "application/json",
    },
  });

  const res = await response.json();
  console.log(res);
  expect(response.status()).toBe(201);
  userid = res.id;
});

test("Update users - PUT", async ({ request }) => {
  const response = await request.put("https://reqres.in/api/users/" + userid, {
    data: {
      name: "Sayujya",
      job: "Developer",
    },

    headers: {
      "x-api-key": "reqres-free-v1",
      "Content-Type": "application/json",
    },
  });

  const res = await response.json();
  console.log(res);
  // response check done
  expect(response.status()).toBe(200);
});

test("Delete user - DELETE", async ({ request }) => {
  const responce = await request.delete(
    "https://reqres.in/api/users/" + userid,
    {
      headers: {
        "x-api-key": "reqres-free-v1",
        "Content-Type": "application/json",
      },
    }
  );

  expect(responce.status()).toBe(204);
});
