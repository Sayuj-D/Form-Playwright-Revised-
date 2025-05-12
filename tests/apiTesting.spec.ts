import { test, expect } from "@playwright/test";

var userid;

test("Get users - GET", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users?page=2");
  console.log(await response.json());
  expect(response.status()).toBe(200);
});

test("Create users - POST", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/users", {
    data: {
      name: "Sayujya",
      job: "Intern",
    },

    headers: {
      "x-api-key": "reqres-free-v1",
      // negative case test,
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
  // response check
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
