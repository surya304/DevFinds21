export function Logo(props) {
  return (
    <div className="flex justify-center">
      {props.color == 'white' && (
        <img src="logo-white.svg" className="h-16 w-36" />
      )}
      {props.color == 'white-big' && (
        <img src="logo-white.svg" className="h-32 w-64" />
      )}
      {props.color == 'blue' && (
        <img src="logo.svg" className="h-32 w-64" />
      )}
     
    </div>
  )
}
