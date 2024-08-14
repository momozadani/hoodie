"use server";

export async function create(formData: FormData) {
  const data = await fetch("http://localhost:3000/api/", {
    method: "POST",
  });
  return "hello";
}
