/* eslint-disable react/no-unescaped-entities */
import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid"
import { Link, useNavigate, useRouteError } from "react-router-dom"

const Error = () => {
  const error = useRouteError()
  const navigate = useNavigate()
  return (
    <div className='error'>
      <h1>Un oh! We've got a problem.</h1>
      <p>{error.message || error.statusText}</p>
      <div className='flex-md'>
        <button onClick={() => navigate(-1)} className='btn btn--dark'>
          <ArrowUturnLeftIcon width={20} />
          <span>Go Back</span>
        </button>
        <Link to='/' className='btn btn--dark'>
          <HomeIcon width={20} />
          <span>Go home</span>
        </Link>
      </div>
    </div>
  )
}
export default Error
