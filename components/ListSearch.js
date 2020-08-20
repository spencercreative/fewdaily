import { listSearchSort } from 'lib/helpers'

export default function ListSearch() {
    return (
        <>
        <div className="mb-4 flex items-center flex-col md:flex-row">
            <label className="my-0 mr-4 font-black text-base" for="list-search">Search:</label>
            <input id="list-search" type="text" className="mx-0 flex-1 text-base" placeholder="Type to sort through posts..." onChange={listSearchSort} />
        </div>
        </>
    )
}