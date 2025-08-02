import { signal } from "@preact/signals-react";

const id = localStorage.getItem("tokenId") || "";
const tokenId = signal(id);
tokenId.subscribe((value) => {
  localStorage.setItem("tokenId", value);
});

const step = signal(0);
const direction = signal<1 | -1>(1);

export { tokenId, step, direction };
