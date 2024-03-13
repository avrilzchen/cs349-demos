type LeftViewProps = {
  count: number;
  handleClick: () => void;
};

export default function LeftView({
  count,
  handleClick,
}: LeftViewProps) {
  return (
    <div class="left-view">
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
