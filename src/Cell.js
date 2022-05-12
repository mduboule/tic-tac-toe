export default function Cell(props) {
  let visualValue = ""
  if (props.value === 1) {
    visualValue = "X"
  }
  else if (props.value === 2) {
    visualValue = "O"
  }
  return (
    <div
      data-row={props.row}
      data-col={props.col}
      value={props.value}
      onClick={props.handleClick}
      className="bg-slate-200 aspect-square select-none cursor-pointer text-4xl md:text-6xl text-center font-semibold grid place-items-center"
    >
      <span>{visualValue}</span>
    </div>
  )
}
