import { sortList, listSearchSort } from 'lib/helpers';
import { useRouter } from 'next/router';

export default function ListSearch() {
	const {
		query: { s },
	} = useRouter();

	sortList(s);

	return (
		<>
			<div className='mb-4 flex items-center flex-col md:flex-row print:hidden'>
				<label
					className='my-0 mr-4 font-black text-base sr-only'
					htmlFor='list-search'
				>
					Search:
				</label>
				<input
					id='list-search'
					type='text'
					className='mx-0 flex-1 text-base'
					placeholder='Type to sort through posts...'
					onChange={listSearchSort}
					defaultValue={s}
					autoComplete='off'
				/>
			</div>
		</>
	);
}
