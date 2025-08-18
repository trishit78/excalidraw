import React, { useRef } from 'react'
import Text from './settings/Text'
import { RightSidebarProps } from '@/types/type'
import { modifyShape } from '@/lib/shapes'
import Color from './settings/Color'
import Export from './settings/Export'

const RightSideBar = (
  {
    elementAttributes,
    setElementAttributes,
    fabricRef,
    activeObjectRef,
    isEditingRef,
    syncShapeInStorage
  }: RightSidebarProps
) => {

  const colorInputRef = useRef(null)
  const strokeInputRef = useRef(null)

  const handleInputChange = (property:string,value:string)=>{
    if(!isEditingRef.current) isEditingRef.current = true
      setElementAttributes((prev)=>({
        ...prev,[property]:value
      }))

      modifyShape({
        canvas:fabricRef.current as fabric.Canvas,
        property,
        value,
        activeObjectRef,
        syncShapeInStorage
      })


  }









  return (
    <div>

         <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-[227px] sticky right-0 h-full max-sm:hidden select-none">
        <h3 className=" px-5 pt-4 text-xs uppercase">Design</h3>

        <Text
          fontFamily={elementAttributes.fontFamily}
          fontSize={elementAttributes.fontSize}
          fontWeight={elementAttributes.fontWeight}
          handleInputChange={handleInputChange}
        />

        <Color 
          inputRef={colorInputRef}
          attribute={elementAttributes.fill}
          attributeType='fill'
          placeholder='color'
          handleInputChange={handleInputChange}
        />
        
        
        
        
        <Color 
          inputRef={strokeInputRef}
          attribute={elementAttributes.stroke}
          attributeType='stroke'
          placeholder='stroke'
          handleInputChange={handleInputChange}
        />

      <Export />

        </section>
    </div>
  )
}

export default RightSideBar