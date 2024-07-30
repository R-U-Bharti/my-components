// 🔴NOTE: formIndex must start with 1🔴
// HOW TO USE
{/* <Stepper formIndex={formIndex} options={{
  1: 'Truck Details',
  2: 'Address',
  3: 'Shipment Service'
}} /> */}

import { RxCaretRight } from 'react-icons/rx'

const Stepper = ({ formIndex = 1, options = {} }) => {
  return (
    <>
      <ul className="relative flex flex-row gap-x-2 px-2">
        {
          typeof (options) === 'object' &&
          Object.entries(options)?.map(([key, value], index) => <>
            <li className="shrink basis-0 flex-1 group">
              <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                <span className={`size-7 flex justify-center items-center shrink-0 ${formIndex < index + 2 ? 'bg-gray-100' : 'bg-green-200'} ${formIndex === index + 1 && 'border-2 border-zinc-500'} font-medium text-zinc-600 rounded-full`}>
                  {key}
                </span>
                <div className={`ms-2 w-full h-px flex-1 ${formIndex < index + 2 ? 'bg-gray-200' : 'bg-green-300'} group-last:hidden`}></div> {index !== Object.entries(options).length - 1 && <span className={`${formIndex < index + 2 ? 'text-gray-200' : 'text-green-300'}`}><RxCaretRight size={20} /></span>}
              </div>
              <div className="mt-3">
                <span className={`block text-sm text-zinc-600 ${formIndex === index + 1 ? 'font-bold' : 'font-medium'} ${formIndex > index + 1 && 'text-green-700'}`}>
                  {value}
                </span>
              </div>
            </li>
          </>
          )}
      </ul>
    </>
  )
}

export default Stepper