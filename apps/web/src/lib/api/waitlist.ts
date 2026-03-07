import { api } from "@qeberodev/api-treaty";

async function getWaitlistDetails(id: string) {
  const { data } = await api
    .waitlist({
      id: id,
    })
    .get();

  if (data) {
    console.log({
      data,
    });
  }
}

export { getWaitlistDetails };
