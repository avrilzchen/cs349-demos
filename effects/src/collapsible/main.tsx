import { render } from "preact";

import { Collapsible } from "./Collapsible";

console.log("collapsible");

function App() {
  return (
    <>
      <Collapsible label="Lorem">
        <h3>Lorem ipsum dolor sit</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Quis consequatur, eos sapiente amet, laboriosam, explicabo
          sequi doloremque pariatur iste velit recusandae quaerat
          ipsum dolorum sit. Doloribus eos laborum consequuntur
          repellat!
        </p>
      </Collapsible>
      <Collapsible label="Recusandae" open={true}>
        <h3>Recusandae sint fugiat quisquam</h3>
        <p>
          Recusandae sint fugiat quisquam tempore ducimus, autem vero
          cum, voluptatibus porro sequi, quae quas labore. Labore
          voluptatem reiciendis quas architecto consequatur fuga quae
          quia, blanditiis aliquam soluta sequi suscipit quaerat.
        </p>
      </Collapsible>
    </>
  );
}

render(<App />, document.body);
