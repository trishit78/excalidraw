"use client";

import {fabric}  from 'fabric';
import LeftSideBar from "@/components/LeftSideBar";
import Live from "@/components/Live";
import Navbar from "@/components/Navbar";
import RightSideBar from "@/components/RightSideBar";
import { useEffect, useRef, useState } from "react";
import { handleCanvaseMouseMove, handleCanvasMouseDown, handleCanvasMouseUp, handleCanvasObjectModified, initializeFabric, renderCanvas } from "@/lib/canvas";
import { handleResize } from '@/lib/resize';
import { ActiveElement } from '@/types/type';
import { useMutation, useStorage } from '@liveblocks/react';

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
const shapeRef = useRef<fabric.Object | null>(null);
const selectedShapeRef = useRef<string | null>('rectangle');

const activeObjectRef = useRef<fabric.Object | null>(null);

  const [activeElement,setActiveElement] = useState<ActiveElement>({
    name:'',
    value:'',
    icon:''
  })

  const canvasObjects = useStorage((root)=> root.canvasObjects)


  const syncShapeInStorage = useMutation(({ storage}, object)=>{
    if (!object) return;
    const {objectId} = object;
    const shapeData = object.toJSON();
    shapeData.objectId = objectId;
    const canvasObjects = storage.get('canvasObjects');

    canvasObjects.set(objectId,shapeData);
  
  },[]);


  const handleActiveElement = (e:ActiveElement)=>{
    setActiveElement(e);
    selectedShapeRef.current = e?.value as string;
  }

  useEffect(()=>{
    const canvas = initializeFabric({canvasRef,fabricRef});
    canvas.on("mouse:down",(options)=>{
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef
      })
    })

canvas.on("mouse:move",(options)=>{
      handleCanvaseMouseMove({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
        syncShapeInStorage
      })
    })
    
canvas.on("mouse:up",(options)=>{
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        shapeRef,
        activeObjectRef,
        selectedShapeRef,
        syncShapeInStorage,
        setActiveElement
      })
    })


canvas.on("object:modified",(options)=>{
      handleCanvasObjectModified({
        options,
        syncShapeInStorage
      })
    })





    window.addEventListener("resize",()=>{
      handleResize({fabricRef})
    })

  },[])

  useEffect(() => {
  if (!fabricRef.current || !canvasObjects) return;
  renderCanvas({ fabricRef, canvasObjects, activeObjectRef });
}, [fabricRef, canvasObjects, activeObjectRef]);



  return (
    <>
      <main className="h-screen overflow-hidden">
        <Navbar 
          activeElement={activeElement}
          handleActiveElement={handleActiveElement}
        />
        <section className="flex h-full flex-row">
          <LeftSideBar   />
          <Live   canvasRef={canvasRef}/>
          <RightSideBar />
        </section>
      </main>
    </>
  );
}

