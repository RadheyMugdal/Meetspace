"use client"
import { Spinner } from "flowbite-react";


const Loader = () => {
  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <Spinner color="info" aria-label="Info spinner example" className=" h-11 w-11 m-auto" />
    </div>

  )
}

export default Loader
