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
      className="bg-slate-200 w-32 h-32 select-none cursor-pointer text-[60px] text-center leading-[8rem] font-semibold"
    >
      {visualValue}
    </div>
  )
}
