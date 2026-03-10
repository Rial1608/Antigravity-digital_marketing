'use client'

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

const TOTAL_FRAMES = 192

const FRAME_PATH =
  process.env.NODE_ENV === "production"
    ? "/Antigravity-digital_marketing/frames"
    : "/frames"

export default function HeroCanvasAnimation() {

  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)

  const [imagesLoaded,setImagesLoaded] = useState(false)
  const [loadProgress,setLoadProgress] = useState(0)
  const [scrollPercent,setScrollPercent] = useState(0)

  // PRELOAD FRAMES
  useEffect(()=>{

    let loaded = 0

    const images:HTMLImageElement[] = []

    for(let i=0;i<TOTAL_FRAMES;i++){

      const img = new Image()

      img.src = `${FRAME_PATH}/frame_${i}.jpg`

      img.onload = ()=>{

        loaded++

        setLoadProgress(Math.round((loaded/TOTAL_FRAMES)*100))

        if(loaded === TOTAL_FRAMES){

          imagesRef.current = images
          setImagesLoaded(true)

        }

      }

      img.onerror = ()=>{

        loaded++

        setLoadProgress(Math.round((loaded/TOTAL_FRAMES)*100))

        if(loaded === TOTAL_FRAMES){

          imagesRef.current = images
          setImagesLoaded(true)

        }

      }

      images.push(img)

    }

  },[])

  // SCROLL + CANVAS
  useEffect(()=>{

    if(!imagesLoaded) return

    const canvas = canvasRef.current
    const container = containerRef.current

    if(!canvas || !container) return

    const ctx = canvas.getContext("2d")

    if(!ctx) return

    const drawFrame = (frame:number)=>{

      const img = imagesRef.current[frame]

      if(!img) return

      const width = canvas.clientWidth
      const height = canvas.clientHeight

      canvas.width = width
      canvas.height = height

      const scaleX = width / img.width
      const scaleY = height / img.height

      const scale = Math.max(scaleX,scaleY)

      const w = img.width * scale
      const h = img.height * scale

      const x = (width - w)/2
      const y = (height - h)/2

      ctx.clearRect(0,0,width,height)

      ctx.drawImage(img,x,y,w,h)

    }

    const handleScroll = ()=>{

      const rect = container.getBoundingClientRect()

      const scrollable = container.offsetHeight - window.innerHeight

      const progress = Math.min(Math.max(-rect.top/scrollable,0),1)

      setScrollPercent(progress)

      const frame = Math.round(progress*(TOTAL_FRAMES-1))

      if(frame !== currentFrameRef.current){

        currentFrameRef.current = frame

        drawFrame(frame)

      }

    }

    drawFrame(0)

    window.addEventListener("scroll",handleScroll)

    window.addEventListener("resize",()=>drawFrame(currentFrameRef.current))

    handleScroll()

    return ()=>{

      window.removeEventListener("scroll",handleScroll)

    }

  },[imagesLoaded])

  const opacity = (start:number,end:number)=>{

    if(scrollPercent<start) return 0

    if(scrollPercent>end) return 0

    return 1

  }

  if(!imagesLoaded){

    return(

      <div className="fixed inset-0 bg-[#1A0F0A] flex flex-col items-center justify-center">

        <div className="w-64 h-2 bg-amber-900/30 rounded-full overflow-hidden mb-4">

          <motion.div
            className="h-full bg-gradient-to-r from-[#D4A574] to-[#4F9C8F]"
            animate={{width:`${loadProgress}%`}}
          />

        </div>

        <p className="text-amber-100/70">

          Loading Experience... {loadProgress}%

        </p>

      </div>

    )

  }

  return(

    <div ref={containerRef} className="relative h-[500vh]">

      <div className="sticky top-0 h-screen w-full overflow-hidden">

        <canvas
          ref={canvasRef}
          style={{width:"100%",height:"100%"}}
        />

        <div className="absolute inset-0 flex items-center justify-center text-center">

          <div style={{opacity:opacity(0,0.25)}}>

            <h1 className="text-7xl md:text-9xl font-bold text-amber-50 mb-4">

              Experience Coffee

            </h1>

            <p className="text-xl text-amber-100/80">

              Where every sip defies gravity

            </p>

          </div>

        </div>

      </div>

    </div>

  )

}
