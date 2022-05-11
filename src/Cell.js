export default function Cell(props) {
  return (
    <div dataRow={props.row} dataCol={props.col} className="bg-slate-200 w-32 h-32"></div>
  )
}
