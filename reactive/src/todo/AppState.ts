import { computed, signal } from "@preact/signals";

//#region utility functions

//#endregion

//#region state

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export const todos = signal<Todo[]>([]);

export const numCompleted = computed(
  () => todos.value.filter((t) => t.completed).length
);

// currently unused in this demo
export const selected = signal<number | null>(null);

//#endregion

//#region mutations

// very simple unique id generator
let nextId = 0;

export const addTodo = (text: string) => {
  // GOOD: assigns new array, signal will know
  todos.value = [
    ...todos.value,
    {
      id: nextId++,
      text,
      completed: false,
    },
  ];

  //   // BAD: this changes the array, but array ref is same
  //   // the signal won't know something changed (it's not reactive)
  //   todos.value.push({
  //     id: nextId++,
  //     text,
  //     completed: false,
  //   });
};

export const deleteTodo = (id: number) => {
  // GOOD: assigns new array, signal will know
  todos.value = todos.value.filter((t) => t.id !== id);
};

export const toggleTodo = (id: number) => {
  // GOOD: assigns new array, signal will know
  todos.value = todos.value.map((t) =>
    t.id === id
      ? ({
          ...t,
          completed: !t.completed,
        } as Todo)
      : t
  );
};

//#endregion
