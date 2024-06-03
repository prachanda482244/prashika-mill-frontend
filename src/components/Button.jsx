import { Link } from "react-router-dom"

const Button = ({to,name,bg}) => {
  return (
<Link to={to} style={{textShadow:"none"}} className={`
${bg?'hover:bg-[#5e5e4a]':'hover:bg-white'}
${ bg? 'hover:text-white':'hover:text-black'} transition-colors delay-75 ease-in hover:border-black border py-2 ${bg ? 'border-black bg-transparent' :'bg-[#5e5e4a]  '}  font-light text-base tracking-wide  px-10 text-center`}>{name}</Link>
  )
}

export default Button
