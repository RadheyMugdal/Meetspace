"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"

import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk"
import { LayoutList, Users } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import EndCallButton from "./EndCallButton"
import Loader from "./Loader"
type CallLayoutType = 'grid' |'speaker-left' |'speaker-right'
const MeetingRoom = () => {
  const [layout,setLayout]=useState<CallLayoutType>("speaker-left")
  const searchParams=useSearchParams() 
  const isPersonalRoom=!!searchParams.get('persional')
  const {useCallCallingState}=useCallStateHooks()
  const callingState=useCallCallingState()
  
  const [showParticipants,setShowParticipants]=useState(false)
  const CallLayout=()=>{
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout/>
        break;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left"/>
        break;
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition="right"/>
        break;
      default:
        return <SpeakerLayout participantsBarPosition="right"/>
        break;
    }
  }
  if(callingState!==CallingState.JOINED) return <Loader/>
  return (
    <section className=" relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className=" relative flex size-full items-center justify-center">
        <div className=" flex size-full max-w-[1000px] items-center">
        <CallLayout/>
        </div>
        <div className={cn(" h-[calc(100vh-86px)] hidden ml-2",{'show-block':showParticipants})}>
          <CallParticipantsList onClose={()=>setShowParticipants(false)} />

        </div>
      </div>
      <div className=" fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls  />
        <DropdownMenu>
          <div className=" flex items-center" >

        <DropdownMenuTrigger className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
          <LayoutList size={20} className=" text-white" />
        </DropdownMenuTrigger>
          </div>
        <DropdownMenuContent className=" border-dark-1 bg-dark-1 text-white">
          {['Grid','Speaker-left','Speaker-right']
          .map((item,index)=>(
            <div key={index}>
              <DropdownMenuItem className=" cursor-pointer" onClick={()=>setLayout(item.toLowerCase() as CallLayoutType)}> 
                {item}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-dark-1" />
            </div>
          ))
          }
        </DropdownMenuContent>
      </DropdownMenu>
      <CallStatsButton/>
      <button onClick={()=>setShowParticipants((prev)=>!prev)} >
        <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
          <Users size={20} className=" text-white" />
        </div>
      </button>
      {!isPersonalRoom && <EndCallButton/> }
      </div>
    </section>
  )
}

export default MeetingRoom