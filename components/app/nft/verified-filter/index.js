import { RadioGroup } from '@headlessui/react'
const filters = ['All', 'Verified', 'Other']

export default function VerifiedFilter({filter, setFilter}){
  return <RadioGroup value={filter} onChange={setFilter}>
    <div className='border divide-x rounded-lg flex' style={{width: 'fit-content'}}>
      {
        filters.map(filter =>
          <RadioGroup.Option key={filter}
                             value={filter}  className={({checked}) => `text-gray-500 px-4 py-2 w-fit font-medium text-sm ${checked ? 'bg-gray-100' : ''}` }>
            <button className='flex items-center gap-2'>
              {filter === 'All' &&<svg width='18' height='14' viewBox='0 0 18 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M16.5 7.00033L6.5 7.00033M16.5 2.00033L6.5 2.00033M16.5 12.0003L6.5 12.0003M3.16667 7.00033C3.16667 7.46056 2.79357 7.83366 2.33333 7.83366C1.8731 7.83366 1.5 7.46056 1.5 7.00033C1.5 6.54009 1.8731 6.16699 2.33333 6.16699C2.79357 6.16699 3.16667 6.54009 3.16667 7.00033ZM3.16667 2.00033C3.16667 2.46056 2.79357 2.83366 2.33333 2.83366C1.8731 2.83366 1.5 2.46056 1.5 2.00033C1.5 1.54009 1.8731 1.16699 2.33333 1.16699C2.79357 1.16699 3.16667 1.54009 3.16667 2.00033ZM3.16667 12.0003C3.16667 12.4606 2.79357 12.8337 2.33333 12.8337C1.8731 12.8337 1.5 12.4606 1.5 12.0003C1.5 11.5401 1.8731 11.167 2.33333 11.167C2.79357 11.167 3.16667 11.5401 3.16667 12.0003Z'
                  stroke='#666F99' strokeWidth='1.66667' strokeLinecap='round' strokeLinejoin='round' />
              </svg>}

              {filter}
            </button></RadioGroup.Option>)
      }
    </div>

  </RadioGroup>
}