import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="flex items-center gap-2 font-medium">
      <div className="border rounded-lg flex items-center p-2 w-80">
        <MagnifyingGlassIcon className="text-gray-500 mr-2 w-5 h-5" />
        <input
          className="border-0"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/*<button className='bg-blue-500 text-white rounded-lg p-3'>*/}
      {/*  <SearchNormal size={18} />*/}
      {/*</button>*/}
    </div>
  )
}
