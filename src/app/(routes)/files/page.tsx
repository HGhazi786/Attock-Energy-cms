import DeleteFile from '@/components/shared/deletefile'
import {list} from '@vercel/blob'
import Link from 'next/link'

export default async function page(){
    const {blobs} =await list()
    return(
        <div>
            {
                blobs.map((blob=>(<div key={blob.url} className='flex space-x-5'>
                    <p>{blob.pathname}</p>
                    <Link href={blob.url} className={'px-4 py-2 bg-gray-900 rounded-full text-white'}>Download</Link>
                    <DeleteFile url={blob.url}/>
                </div>)))
            }
        </div>
    )
}