// app state
import { count, increment } from "./state";

export default function LeftView() {
  return (
    <div class="p-3 bg-white border border-gray-500 flex-1 flex justify-center items-center">
      <button class="min-w-[80px]" onClick={() => increment()}>
        {count.value}
      </button>
    </div>
  );
}
