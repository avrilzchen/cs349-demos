import { signal } from "@preact/signals";

// state
export const count = signal(0);

// mutations
export const increment = () => {
  count.value++;
};
